# 🛒 MERN Ecommerce – Seamless Shopping Experience

A full-stack ecommerce web application built using the **MERN stack (MongoDB, Express.js, React, Node.js)** with **Redux Toolkit** for state management and **Material UI** for a modern and responsive user interface.

This project provides a complete online shopping experience for users and a powerful admin dashboard for managing products, orders, and customers.

🌐 Live Demo (optional): https://mernchat.in  
📌 Related Project: End-to-End Encrypted Chat Application using Next.js, Prisma, PostgreSQL, Express, Socket.io

---

## ✨ Features

### 👤 User Features

**🛍 Product Reviews**
- Add, edit, and delete product reviews
- Real-time rating updates
- Dynamic star-based rating calculation

**❤️ Wishlist System**
- Save favorite products
- Add personal notes to wishlist items
- Remove items anytime

**🛒 Shopping Cart**
- Add/remove products
- Update quantity dynamically
- View subtotal and total price instantly

**📦 Order Management**
- Place orders securely
- Track order history
- View order status updates

**👤 Profile Management**
- Update username and email
- Manage multiple shipping addresses
- View personal order history

---

### 🧑‍💼 Admin Features

**📦 Product Management**
- Add new products
- Edit existing products
- Soft delete products
- Manage stock availability and attributes

**📊 Order Management**
- View all customer orders
- Update order status (Processing, Shipped, Delivered, Cancelled)

---

### 🔐 Authentication & Security

- JWT-based authentication system
- Secure login & signup
- OTP verification system
- Password reset functionality via email
- Protected routes for users and admins

---

### 🎨 UI/UX Design

- Built using Material UI components
- Fully responsive design (mobile + desktop)
- Clean and modern interface
- Smooth navigation and transitions

---

### ⚙️ System Architecture

- Scalable MERN architecture
- RESTful API design
- Redux Toolkit for efficient state management
- Modular backend structure (controllers, routes, models)

---

## 🚀 Project Setup Guide

---

## 📌 Prerequisites

Make sure you have the following installed:

- Node.js (v18 or later recommended)
- MongoDB (local or cloud like MongoDB Atlas)
- npm or yarn package manager

---

## 📥 Clone the Repository

bash
git clone https://github.com/your-username/mern-ecommerce.git
cd mern-ecommerce

## 📦 Install Dependencies

### Backend Setup

bash
cd backend
npm install
Frontend Setup
cd frontend
npm install
🔐 Environment Variables Setup
📌 Backend .env

Create a .env file inside the backend folder and add the following:

MONGO_URI=mongodb://localhost:27017/mern-ecommerce

ORIGIN=http://localhost:3000

EMAIL=your-email@example.com
PASSWORD=your-email-password

SECRET_KEY=your-secret-key

LOGIN_TOKEN_EXPIRATION=30d
OTP_EXPIRATION_TIME=120000
PASSWORD_RESET_TOKEN_EXPIRATION=2m
COOKIE_EXPIRATION_DAYS=30

PRODUCTION=false
📌 Frontend .env

Create a .env file inside the frontend folder:

REACT_APP_BASE_URL=http://localhost:8000
🌱 Database Seeding (Optional but Recommended)

Populate the database with sample data for quick testing:

cd backend
npm run seed

This will add:

Demo users
Products
Reviews
Cart data
Orders
▶️ Running the Project
🚀 Start Backend Server
cd backend
npm run dev

Backend runs at:

http://localhost:8000
🌐 Start Frontend Server
cd frontend
npm start

Frontend runs at:

http://localhost:3000
🔑 Demo Login Credentials

Use the following account to explore the application:

Email: demo@gmail.com
Password: helloWorld@123
⚠️ Important Notes
OTP verification is disabled for demo account
Password reset will not work for demo account
Use a real email for full authentication testing
Never upload .env files to GitHub
Ensure MongoDB is running before starting backend
🌍 Application URLs
Service	URL
Frontend	http://localhost:3000
Backend	http://localhost:8000
📁 Project Structure Overview
mern-ecommerce/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── seed/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.js
│   └── public/
│
└── README.md
