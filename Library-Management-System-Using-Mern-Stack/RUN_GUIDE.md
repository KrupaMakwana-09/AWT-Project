# 🚀 How to Run the Library Management System

Follow these steps to get the project up and running on your local machine.

## Prerequisites
- **Node.js**: Ensure you have Node.js installed (v18+ recommended).
- **MongoDB**: Make sure MongoDB is running locally at `mongodb://127.0.0.1:27017/librarydb`.

---

## 1. Backend Setup
1.  Open a terminal in the `backend` directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Ensure your `.env` file has the following:
    ```env
    PORT=5001
    MONGO_URI=mongodb://127.0.0.1:27017/librarydb
    JWT_SECRET=myjwtsecret
    NODE_ENV=development
    ```
4.  Start the backend server:
    ```bash
    npm run dev
    ```
    *You should see: `Server running in development mode on port 5001`*

---

## 2. Frontend Setup
1.  Open a **new** terminal in the `frontend` directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend application:
    ```bash
    npm run dev
    ```
    *The application will be available at [http://localhost:5173](http://localhost:5173)*

---

## 3. Login Credentials
- **Admin**: `admin@example.com` / `admin123`
- **User**: Register a new account via the "Sign up" link on the login page.

---

## 🛠️ Troubleshooting
- **CORS Error**: Ensure both backend (5001) and frontend (5173) are running.
- **DB Connection Error**: Verify MongoDB is running (try opening MongoDB Compass to check).
