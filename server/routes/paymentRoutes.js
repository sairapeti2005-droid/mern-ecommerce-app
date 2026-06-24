const express = require("express");
const Razorpay = require("razorpay");

require("dotenv").config();

const router = express.Router();

console.log("KEY_ID =", process.env.RAZORPAY_KEY_ID);
console.log("KEY_SECRET =", process.env.RAZORPAY_KEY_SECRET);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
router.post(
  "/create-order",
  async (req, res) => {
    try {
      const { amount } = req.body;

      const options = {
        amount: amount * 100, // paisa
        currency: "INR",
        receipt:
          "receipt_" + Date.now(),
      };

      const order =
        await razorpay.orders.create(
          options
        );

      res.json(order);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;