# 📚 Library Management System (MERN Stack)

A sophisticated and modern Library Management System built using the **MERN** stack (**M**ongoDB, **E**xpress.js, **R**eact.js, **N**ode.js). Experience a feature-rich platform with real-time notifications powered by **Socket.io**, all wrapped in a premium **Glassmorphism** UI.

---

## ✨ Features

### 👤 For Users
*   **Intuitive Dashboard:** A personalized view of your library activities.
*   **Search & Filters:** Browse the library catalog with ease using advanced search and category filters.
*   **Book Details:** View in-depth book information and check real-time availability.
*   **Borrowing System:** Request to borrow books with a click.
*   **Real-time Notifications:** Instant alerts for borrow approvals/rejections and other updates.
*   **User Profiles:** Manage your account and track your borrow history effortlessly.

### 🛡️ For Admins
*   **Powerful Admin Dashboard:** High-level overview with key metrics and statistics.
*   **Inventory Management:** Full CRUD operations for managing the library's book collection.
*   **User Management:** Admin controls to block, unblock, or delete users for security and moderation.
*   **Request Management:** Real-time system to approve or reject book borrow requests.
*   **Monitoring:** Track all borrowed books and manage returns through a streamlined interface.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, React Router, Vite, Bootstrap, Axios, Socket.io Client |
| **Backend** | Node.js, Express.js, Socket.io |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT (JSON Web Tokens), Bcrypt.js |
| **Icons & UI** | React Icons, Glassmorphism CSS |

---

## 📁 Project Structure

```bash
library-management-system/
├── backend/                # Express & Node.js Server
│   ├── config/             # DB and other configurations
│   ├── controllers/        # Business logic for routes
│   ├── middleware/         # Auth and verify roles
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API endpoints
│   ├── socket/             # Socket.io event handlers
│   ├── utils/              # Helper functions
│   └── server.js           # Server entry point
└── frontend/               # React & Vite Application
    ├── public/             # Static assets
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Application views/screens
    │   ├── context/        # Global state management
    │   ├── services/       # API integration layer
    │   ├── socket/         # Socket.io client setup
    │   ├── App.jsx         # Main component & routing
    │   └── index.css       # Global styles (Glassmorphism)
    └── vite.config.js      # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org/) installed
*   [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Start the backend server:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The application will be running at [http://localhost:5173](http://localhost:5173).

---

## 🔐 Admin Access
1.  Register a new user account through the frontend.
2.  In your MongoDB database (e.g., via Compass), locate the user and change their `role` field from `'user'` to `'admin'`.
3.  Log in again to access the Admin Panel.

---

## 🤝 Contributing
Contributions are welcome! Feel free to open a pull request or report any issues.

---

## 📄 License
This project is licensed under the ISC License.

---

Built with ❤️ by [Mitul Aghara](https://github.com/mitulaghara)
