exports.resendOtp = async (req, res) => {
  try {
    console.log("RESEND OTP REQUEST RECEIVED");
    console.log("User ID:", req.body.user);

    const existingUser = await User.findById(req.body.user);

    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    console.log("User found:", existingUser.email);

    await Otp.deleteMany({ user: existingUser._id });

    const otp = generateOTP();
    console.log("Generated OTP");

    const hashedOtp = await bcrypt.hash(otp, 10);

    const newOtp = new Otp({
      user: req.body.user,
      otp: hashedOtp,
      expiresAt:
        Date.now() +
        parseInt(process.env.OTP_EXPIRATION_TIME),
    });

    await newOtp.save();

    console.log("OTP saved in database");

    await sendMail(
      existingUser.email,
      "OTP Verification",
      `Your OTP is <b>${otp}</b>`
    );

    console.log("OTP MAIL SENT");

    res.status(201).json({
      message: "OTP sent",
    });
  } catch (error) {
    console.error("RESEND OTP ERROR:");
    console.error(error);

    res.status(500).json({
      message: error.message,
      error: error.code || "UNKNOWN",
    });
  }
};
console.log({
  signup: typeof exports.signup,
  login: typeof exports.login,
  verifyOtp: typeof exports.verifyOtp,
  resendOtp: typeof exports.resendOtp,
  forgotPassword: typeof exports.forgotPassword,
  resetPassword: typeof exports.resetPassword,
});
