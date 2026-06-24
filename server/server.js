const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const wishlistRoutes = require("./routes/wishlistRoutes");
const connectDB = require("./config/db");
const orderRoutes =require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes =require("./routes/paymentRoutes");
const adminRoutes =require("./routes/adminRoutes");
dotenv.config();
console.log(
  "RAZORPAY_KEY_ID =",
  process.env.RAZORPAY_KEY_ID
);

console.log(
  "RAZORPAY_KEY_SECRET:",
  process.env.RAZORPAY_KEY_SECRET
);
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/api/admin",
  adminRoutes
);
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use(
  "/api/orders",
  orderRoutes
);

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
const PORT = process.env.PORT || 5001;
app.use(
  "/api/payment",
  paymentRoutes
);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});