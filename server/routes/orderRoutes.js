const express = require("express");

const router = express.Router();

const verifyToken =
  require("../middleware/authMiddleware");

const Cart =
  require("../models/Cart");

const Order =
  require("../models/Order");


// PLACE ORDER

router.post(
  "/place",
  verifyToken,
  async (req, res) => {
    try {

      const cartItems =
        await Cart.find({
          user: req.user.id,
        }).populate("product");

      if (
        !cartItems ||
        cartItems.length === 0
      ) {
        return res.status(400).json({
          message: "Cart is Empty",
        });
      }

      const totalAmount =
        cartItems.reduce(
          (sum, item) =>
            sum +
            item.product.price *
              item.quantity,
          0
        );

      const orderItems =
        cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        }));

      const order =
        await Order.create({
          user: req.user.id,
          items: orderItems,
          totalAmount,
        });

      await Cart.deleteMany({
        user: req.user.id,
      });

      res.json({
        message:
          "Order Placed Successfully",
        order,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);


// MY ORDERS

router.get(
  "/my-orders",
  verifyToken,
  async (req, res) => {
    try {

      const orders =
        await Order.find({
          user: req.user.id,
        })
          .populate("items.product")
          .sort({
            createdAt: -1,
          });

      res.json(orders);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);


// ALL ORDERS (ADMIN)

router.get(
  "/all",
  verifyToken,
  async (req, res) => {
    try {

      if (
        req.user.role !== "admin"
      ) {
        return res.status(403).json({
          message: "Admin Only",
        });
      }

      const orders =
        await Order.find()
          .populate(
            "user",
            "name email"
          )
          .populate(
            "items.product"
          )
          .sort({
            createdAt: -1,
          });

      res.json(orders);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);
// UPDATE ORDER STATUS (ADMIN)

router.put(
  "/status/:id",
  verifyToken,
  async (req, res) => {
    try {

      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Admin Only",
        });
      }

      const { status } = req.body;

      const order =
        await Order.findByIdAndUpdate(
          req.params.id,
          { status },
          { new: true }
        );

      if (!order) {
        return res.status(404).json({
          message: "Order Not Found",
        });
      }

      res.json({
        message:
          "Order Status Updated",
        order,
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);
module.exports = router;