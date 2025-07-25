# 💰 FI Money — Inventory Management API

FI Money is a minimal inventory and product management backend service built with **Node.js**, **Express**, and **PostgreSQL**. It includes a simple frontend to interact with the API and perform basic CRUD operations on products. This project is designed as a backend-focused application with clean code structure, RESTful API conventions, and modular components.

---

## ⚙️ Features

- RESTful API for product management
- PostgreSQL database integration
- Simple frontend for testing
- JSON Web Token (JWT) authentication
- Schema auto-initialization via `dbSetup()`
- Modular, maintainable codebase

---

## 🚀 Getting Started

Follow these steps to set up and run the project on your local machine.

---

## 📦 Install Dependencies

### Backend:

```bash
cd backend
npm install
```

### Frontend:

```bash
cd frontend
npm install
```

---

## 🗄️ Initialize the Database

To automatically create the necessary tables, run:

```bash
cd backend
node utils/dbSetup.js
```

This will execute the `dbSetup()` function inside `utils/dbSetup.js` and set up your PostgreSQL schema.

---

## 🧪 Run the Application

### Start the Backend:

```bash
cd backend
npm run dev
```

### Start the Frontend:

```bash
cd frontend
npm run dev
```

The backend runs on `http://localhost:8080/` and the frontend on `http://localhost:5173/` (default Vite port).

---

## 📡 API Endpoints Documentation

All API responses are in JSON format. Below are the supported routes:

---

## 🔐 Authentication Routes

### POST `/register`

Registers a new user.

**Request Body:**

```json
{
  "name": "Akash",
  "password": "your_password"
}
```

---

### POST `/login`

Logs in a user and returns a JWT.

**Request Body:**

```json
{
  "username": "Akash",
  "password": "your_password"
}
```

---

## 📦 Product Routes

### POST `/products`

Adds a new product (authentication required).

**Request Body:**

```json
{
  "name": "Phone",
  "type": "Electronics",
  "sku": "PHN-001",
  "image_url": "https://example.com/phone.jpg",
  "description": "Smartphone with 6GB RAM",
  "quantity": 10,
  "price": 499.99
}
```

---

### PUT `/products/:product_id/quantity`

Updates the quantity of a product by `product_id`.

**Request Body:**

```json
{
  "quantity": 15
}
```

---

### GET `/products`

Returns a list of all products.

**Response Example:**

```json
[
  {
    "id": 1,
    "name": "Phone",
    "type": "Electronics",
    "sku": "PHN-001",
    "image_url": "https://example.com/phone.jpg",
    "description": "Smartphone with 6GB RAM",
    "quantity": 10,
    "price": 499.99
  },
  {
    "id": 2,
    "name": "Laptop",
    "type": "Electronics",
    "sku": "LTP-001",
    "image_url": "https://example.com/laptop.jpg",
    "description": "Laptop with 16GB RAM",
    "quantity": 5,
    "price": 999.99
  }
]
```

---

## ✨ Note

We used AI assistance to help scaffold and design parts of the frontend UI, as the focus of this project was backend proficiency.

---

## 🧠 Tech Stack

* **Backend**: Node.js, Express.js, PostgreSQL
* **Frontend**: Vite + React, JavaScript/HTML
* **Database**: Neon/PostgreSQL
* **Auth**: JWT-based stateless authentication

---

---

## 📜 License

This project is for educational purposes and may be freely used and modified.

---
