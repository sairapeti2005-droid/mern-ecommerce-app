const express = require("express");
const router = express.Router();

const verifyToken =
  require("../middleware/authMiddleware");

const User =
  require("../models/User");

const Product =
  require("../models/Product");

const Order =
  require("../models/Order");

router.get(
  "/stats",
  verifyToken,
  async (req, res) => {
    try {

      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Admin Only",
        });
      }

      const totalUsers =
        await User.countDocuments();

      const totalProducts =
        await Product.countDocuments();

      const totalOrders =
        await Order.countDocuments();

      const orders =
        await Order.find();

      const totalRevenue =
        orders.reduce(
          (sum, order) =>
            sum + order.totalAmount,
          0
        );

      res.json({
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;