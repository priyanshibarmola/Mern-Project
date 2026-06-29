# 🛍️ MERN Shop

A full-stack e-commerce web application built with **MongoDB, Express, React, and Node.js**. Browse products, add them to your cart or wishlist, check out, track your orders, and leave reviews — with a separate dashboard for admins to manage the whole catalog.

🔗 **Live demo:** [mern-project-kohl-kappa.vercel.app](https://youtu.be/d-RMC1Qg1rQ)

---

## ✨ Features

### 🛒 For customers
- 🔐 Email/password signup with **OTP email verification**
- 🔑 Login, logout, and **forgot/reset password** via emailed link
- 🔍 Browse products with **category & brand filters**, keyword search, and price sorting
- 🖼️ Product detail pages with image galleries and **customer reviews** (star ratings)
- 🛍️ Add to cart, update quantities, remove items
- ❤️ Wishlist — save items for later
- 📦 Multi-address checkout with **Cash on Delivery** or **Card** payment selection
- 📜 Order history with live status tracking (Pending → Dispatched → Out for delivery → Delivered / Cancelled)
- 👤 Editable user profile

### 🛠️ For admins
- 🚪 Separate admin dashboard, gated by an `isAdmin` flag on the account
- ➕ Add, update, and soft-delete products
- 📋 View and update order statuses across **all** customers
- 🗂️ Same catalog browsing tools (filters, search) for managing inventory

---

## 🧰 Tech Stack

| Layer | Tech |
|---|---|
| **Frontend** | React · Redux Toolkit · React Router · Material UI · Framer Motion · React Hook Form |
| **Backend** | Node.js · Express · MongoDB (Mongoose) · JWT · bcryptjs |
| **Email** | [Resend](https://resend.com) API *(used instead of SMTP — most free hosts, including Render, block outbound SMTP ports)* |
| **Hosting** | Frontend → Vercel · Backend → Render · Database → MongoDB Atlas |

---

## 📁 Project Structure

```
Mern-Project/
├── backend/
│   ├── controllers/      # Request handlers (Auth, Product, Cart, Order, etc.)
│   ├── models/            # Mongoose schemas
│   ├── routes/             # Express route definitions
│   ├── middleware/      # JWT verification
│   ├── utils/                # Email sending, OTP generation, token signing
│   ├── seed/                # One-time database seeding scripts
│   └── index.js            # App entry point
└── frontend/
    └── src/
        ├── features/      # Redux slices + components, grouped by domain
        │   (auth, products, cart, wishlist, checkout, order, address,
        │    admin, brands, categories, review, user, navigation, footer)
        ├── pages/           # Route-level page wrappers
        ├── hooks/           # Custom hooks (e.g. auth check on app load)
        └── config/         # Axios instance setup
```

---

## 🚀 Local Setup

### ✅ Prerequisites
- Node.js 18+
- A MongoDB connection string (MongoDB Atlas free tier works great)
- A free [Resend](https://resend.com) account + API key, for OTP and password reset emails

### ⚙️ Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=any_long_random_string
LOGIN_TOKEN_EXPIRATION=30d
PASSWORD_RESET_TOKEN_EXPIRATION=10m
OTP_EXPIRATION_TIME=300000
ORIGIN=http://localhost:3000
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=onboarding@resend.dev
PRODUCTION=false
```

Start it up:

```bash
npm run dev
```

🟢 Backend runs on `http://localhost:8000`

### 💻 Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
REACT_APP_BASE_URL=http://localhost:8000
```

Start it up:

```bash
npm start
```

🟢 Frontend runs on `http://localhost:3000`

### 🌱 Seeding sample data

Populate the database with sample brands, categories, products, and demo users:

```bash
cd backend
npm run seed
```

⚠️ This is a **one-time** operation — running it twice will throw duplicate-key errors, since seeded documents use fixed IDs.

### 👑 Creating an admin account

No admin account exists in the seed data by default. To get admin access:

1. Sign up normally through the app
2. Open your `users` collection in MongoDB (Atlas dashboard or `mongosh`)
3. Find your account and set `isAdmin: true`
4. Log out → log back in → you'll land on the admin dashboard 🎉

---

## ☁️ Deployment Notes

> 💡 A few real-world gotchas we ran into while deploying this — worth knowing before you do the same.

- **📧 Email on Render's free tier** — Render blocks outbound SMTP ports on free instances, so Nodemailer + Gmail will just time out. This project uses the **Resend HTTP API** instead, which works fine over standard HTTPS.
- **🧪 Resend test mode** — Without a verified domain, Resend only lets you send to the email address that *owns* the Resend account. To send OTP/reset emails to real customers, verify a domain under Resend's **Domains** settings.
- **🍪 Cross-origin cookies** — Since the frontend (Vercel) and backend (Render) live on different domains, the login cookie needs `sameSite: "none"` + `secure: true` to survive. Set `PRODUCTION=true` on your backend host so logins persist across refreshes.
- **🔧 Running one-off scripts on Render's free tier** — there's no shell access on free instances. To run a one-time script (seeding, data backfills), temporarily point the `start` script in `backend/package.json` at the script, deploy, watch the logs, then revert `start` back to `node index.js`.

---

## ⚠️ Known Limitations

- 🖼️ Product images are pulled automatically from free stock-photo search and may not always be a perfect visual match for the product title
- 💳 No real payment gateway — checkout is a demo flow only (no actual payment processing)
- 📤 No image upload for products — image URLs must be entered manually in the admin form
- 🔎 Search performs a simple case-insensitive match on product titles, not a full search index

---

## 📄 License

This project is for educational purposes. 🎓
