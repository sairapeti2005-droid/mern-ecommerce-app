# 🛒 ClickMart – MERN E-Commerce Application

ClickMart is a full-stack e-commerce web application built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. It provides a complete online shopping experience with user authentication, product management, cart and wishlist functionality, order processing, Razorpay payments, and an admin dashboard.

## 🌐 Live Demo

**Live Application:**
https://mern-ecommerce-app-kappa.vercel.app

**Backend API:**
https://mern-ecommerce-app-w7nr.onrender.com

---

## ✨ Features

### 👤 User Features

* User registration and login
* JWT-based authentication
* View product catalog
* Search and filter products
* Sort products by price
* View product details
* Add products to cart
* Increase/decrease cart quantity
* Remove products from cart
* Add products to wishlist
* Razorpay test payment integration
* Place orders
* View order history and status
* User profile

### 🛠️ Admin Features

* Role-based admin authorization
* Add new products
* Edit existing products
* Delete products
* View customer orders
* Update order status
* Order statuses: Pending, Processing, Shipped, Delivered, Cancelled
* Admin analytics dashboard
* Secure admin-only product APIs

---

## 💻 Tech Stack

**Frontend**

* React.js
* Vite
* JavaScript
* Bootstrap
* Axios
* React Router

**Backend**

* Node.js
* Express.js
* RESTful APIs
* JWT Authentication
* Mongoose

**Database**

* MongoDB
* MongoDB Atlas

**Payment**

* Razorpay Payment Gateway – Test Mode

**Deployment**

* Vercel – Frontend
* Render – Backend
* MongoDB Atlas – Cloud Database

**Version Control**

* Git
* GitHub

---

## 🔗 REST API Endpoints

### Authentication

```text
POST  /api/auth/register
POST  /api/auth/login
GET   /api/auth/profile
```

### Products

```text
GET     /api/products
GET     /api/products/:id
POST    /api/products/add
PUT     /api/products/:id
DELETE  /api/products/:id
```

Product creation, modification, and deletion are protected using admin authorization.

### Cart

```text
GET     /api/cart
POST    /api/cart/add
PUT     /api/cart/:id
DELETE  /api/cart/:id
```

### Wishlist

```text
GET     /api/wishlist
POST    /api/wishlist/add
DELETE  /api/wishlist/:id
```

### Orders

```text
POST  /api/orders/place
GET   /api/orders/my-orders
GET   /api/orders/all
```

### Payment

```text
POST  /api/payment/create-order
```

---

## 🔐 Authentication & Authorization

ClickMart uses **JWT (JSON Web Token)** authentication.

After successful login, a token is generated and used to authenticate protected API requests.

Role-based authorization separates:

```text
User  → Shopping, Cart, Wishlist, Orders
Admin → Product Management, Orders, Analytics
```

Sensitive operations such as adding, editing, and deleting products are protected on the backend.

---

## 💳 Payment Flow

```text
Add Product to Cart
        ↓
Checkout
        ↓
Create Razorpay Order
        ↓
Razorpay Test Payment
        ↓
Payment Success
        ↓
Create Order
        ↓
Clear User Cart
        ↓
Order Available in My Orders
```

> Razorpay is configured in **Test Mode**, so no real money is charged during demonstration/testing.

---

## 📁 Project Structure

```text
ecommerce-mern/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── ...
│   ├── public/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/sairapeti2005-droid/mern-ecommerce-app.git
cd mern-ecommerce-app
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

Create:

```text
server/.env
```

Add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```

Start backend:

```bash
node server.js
```

### 3. Install Frontend Dependencies

Open another terminal:

```bash
cd client
npm install
```

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:5001/api
```

Start frontend:

```bash
npm run dev
```

---

## 🔒 Security

* JWT-based authentication
* Role-based access control
* Admin-only CRUD operations
* Protected cart, wishlist, order, and profile routes
* Razorpay secret key stored only on the backend
* Environment variables used for sensitive credentials
* Backend authorization prevents normal users from modifying products

> Never commit `.env` files, MongoDB credentials, JWT secrets, or Razorpay secret keys to GitHub.

---

## 🚀 Deployment

The application is deployed using:

```text
React Frontend → Vercel
Node/Express API → Render
Database → MongoDB Atlas
Payment → Razorpay Test Mode
```

---

## 🔮 Future Enhancements

* Cloudinary product image upload
* Product reviews and ratings
* Coupon and discount system
* Email order notifications
* Advanced inventory management
* Improved sales analytics
* Payment signature verification
* Forgot/reset password functionality

---

## 👨‍💻 Author

**Lokesh Gana Venkata Sai Ram Rapeti**

B.Tech – Artificial Intelligence & Data Science

GitHub: https://github.com/sairapeti2005-droid

---

## ⭐ Support

If you found this project useful, consider giving the repository a ⭐.
