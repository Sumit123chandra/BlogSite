# 📝 BlogSite — Full Stack MERN Blog Application

Welcome to **BlogSite**, a modern full-stack blog platform built with the **MERN** stack (MongoDB, Express, React, Node.js). Users can register, log in, and create, edit, or delete blog posts. It’s fast, mobile-responsive, and comes with secure authentication, search functionality, and smooth UI animations.

---

## 🌐 Live Demo

- 🔗 **Frontend (Vercel)**: [https://blog-site-silk-nine.vercel.app](https://blog-site-silk-nine.vercel.app/)
- 🔗 **Backend API (Render)**: [https://blogsite-fxsk.onrender.com](https://blogsite-fxsk.onrender.com)

---

## 🛠️ Tech Stack

### 🚀 Frontend
- React
- Tailwind CSS
- React Router DOM
- Framer Motion (animations)

### 🧠 Backend
- Node.js + Express.js
- MongoDB Atlas (cloud database)
- JWT (JSON Web Tokens) for authentication
- bcrypt for password hashing
- dotenv for managing environment variables

---

## 🔐 Features

- ✅ User registration and login with JWT
- ✅ Create, read, update, delete (CRUD) blog posts
- ✅ Only post authors can edit or delete their posts
- ✅ Live search to filter blog posts
- ✅ Mobile responsive and modern UI
- ✅ Smooth animations with Framer Motion

---

## 🧑‍💻 Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Sumit123chandra/BlogSite.git
cd BlogSite
```

### 2. Setup Backend

```bash
cd server
npm install
```

## Create a .env file inside server/:

PORT=10000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
```bash
npm start
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```
