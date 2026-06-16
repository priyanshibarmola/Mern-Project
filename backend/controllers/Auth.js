const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Otp = require("../models/OTP");
const PasswordResetToken = require("../models/PasswordResetToken");

const { generateOTP } = require("../utils/GenerateOtp");
const { sendMail } = require("../utils/Emails");
const { sanitizeUser } = require("../utils/SanitizeUser");
const { generateToken } = require("../utils/GenerateToken");

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.PRODUCTION === "true",
  sameSite: process.env.PRODUCTION === "true" ? "none" : "lax",
};

exports.signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const createdUser = new User({ ...req.body, password: hashedPassword });
    await createdUser.save();

    const secureInfo = sanitizeUser(createdUser);

    const token = generateToken(secureInfo);
    res.cookie("token", token, COOKIE_OPTIONS);

    // generate and send OTP, but don't fail signup if email fails
    try {
      const otp = generateOTP();
      const hashedOtp = await bcrypt.hash(otp, 10);

      const newOtp = new Otp({
        user: createdUser._id,
        otp: hashedOtp,
        expiresAt: Date.now() + parseInt(process.env.OTP_EXPIRATION_TIME),
      });
      await newOtp.save();

      await sendMail(
        createdUser.email,
        "OTP Verification",
        `Your OTP is <b>${otp}</b>`
      );
    } catch (otpError) {
      console.error("OTP GENERATION/SEND ERROR DURING SIGNUP:", otpError);
    }

    res.status(201).json(secureInfo);
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ message: "Error occurred during signup, please try again later" });
  }
};

exports.login = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const secureInfo = sanitizeUser(existingUser);

    const token = generateToken(secureInfo);
    res.cookie("token", token, COOKIE_OPTIONS);

    res.status(200).json(secureInfo);
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Error occurred while logging in, please try again later" });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const isValidUserId = await User.findById(userId);
    if (!isValidUserId) {
      return res.status(404).json({ message: "User not found" });
    }

    const isOtpExisting = await Otp.findOne({ user: userId }).sort({ expiresAt: -1 });
    if (!isOtpExisting) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (isOtpExisting.expiresAt < Date.now()) {
      await Otp.findByIdAndDelete(isOtpExisting._id);
      return res.status(400).json({ message: "OTP expired" });
    }

    const isOtpValid = await bcrypt.compare(otp, isOtpExisting.otp);
    if (!isOtpValid) {
      return res.status(400).json({ message: "Incorrect OTP" });
    }

    await Otp.findByIdAndDelete(isOtpExisting._id);

    const verifiedUser = await User.findByIdAndUpdate(
      userId,
      { isVerified: true },
      { new: true }
    );

    const secureInfo = sanitizeUser(verifiedUser);
    res.status(200).json(secureInfo);
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    res.status(500).json({ message: "Error occurred while verifying OTP, please try again later" });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const existingUser = await User.findById(req.body.user);

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await Otp.deleteMany({ user: existingUser._id });

    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);

    const newOtp = new Otp({
      user: req.body.user,
      otp: hashedOtp,
      expiresAt: Date.now() + parseInt(process.env.OTP_EXPIRATION_TIME),
    });

    await newOtp.save();

    await sendMail(existingUser.email, "OTP Verification", `Your OTP is <b>${otp}</b>`);

    res.status(201).json({ message: "OTP sent" });
  } catch (error) {
    console.error("RESEND OTP ERROR:", error);
    res.status(500).json({
      message: error.message,
      error: error.code || "UNKNOWN",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    await PasswordResetToken.deleteMany({ user: existingUser._id });

    const token = generateToken(sanitizeUser(existingUser), true);
    const hashedToken = await bcrypt.hash(token, 10);

    const newToken = new PasswordResetToken({
      user: existingUser._id,
      token: hashedToken,
      expiresAt: Date.now() + parseInt(process.env.PASSWORD_RESET_TOKEN_EXPIRATION_MS || 600000),
    });
    await newToken.save();

    const resetLink = `${process.env.ORIGIN}/reset-password/${existingUser._id}/${token}`;

    await sendMail(
      existingUser.email,
      "Password Reset Link",
      `Click <a href="${resetLink}">here</a> to reset your password. This link expires soon.`
    );

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    res.status(500).json({ message: "Error occurred, please try again later" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { userId, token, password } = req.body;

    const isValidUserId = await User.findById(userId);
    if (!isValidUserId) {
      return res.status(404).json({ message: "User not found" });
    }

    const isResetTokenExisting = await PasswordResetToken.findOne({ user: userId }).sort({ expiresAt: -1 });
    if (!isResetTokenExisting) {
      return res.status(400).json({ message: "Reset link is invalid or has expired" });
    }

    if (isResetTokenExisting.expiresAt < Date.now()) {
      await PasswordResetToken.findByIdAndDelete(isResetTokenExisting._id);
      return res.status(400).json({ message: "Reset link has expired" });
    }

    const isTokenValid = await bcrypt.compare(token, isResetTokenExisting.token);
    if (!isTokenValid) {
      return res.status(400).json({ message: "Reset link is invalid" });
    }

    await PasswordResetToken.findByIdAndDelete(isResetTokenExisting._id);

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    res.status(500).json({ message: "Error occurred, please try again later" });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    if (req.user) {
      const existingUser = await User.findById(req.user._id);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(sanitizeUser(existingUser));
    }
    res.sendStatus(401);
  } catch (error) {
    console.error("CHECK AUTH ERROR:", error);
    res.status(500).json({ message: "Error occurred, please try again later" });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token", COOKIE_OPTIONS);
  res.sendStatus(200);
};
