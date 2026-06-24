const express = require("express");
const Cart = require("../models/Cart");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();


// Get User Cart
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user.id,
    }).populate("product");

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Add To Cart
router.post("/add", verifyToken, async (req, res) => {
  try {
    const { productId } = req.body;

    const existingItem = await Cart.findOne({
      user: req.user.id,
      product: productId,
    });

    if (existingItem) {
      existingItem.quantity += 1;

      await existingItem.save();

      return res.json(existingItem);
    }

    const cartItem = new Cart({
      user: req.user.id,
      product: productId,
      quantity: 1,
    });

    await cartItem.save();

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Update Quantity
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem =
      await Cart.findByIdAndUpdate(
        req.params.id,
        { quantity },
        { new: true }
      );

    res.json(cartItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Delete Item
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Item Removed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;