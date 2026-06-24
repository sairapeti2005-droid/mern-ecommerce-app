const express = require("express");
const Wishlist = require("../models/Wishlist");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();


// Get Wishlist
router.get("/", verifyToken, async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user.id,
    }).populate("product");

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Add To Wishlist
router.post("/add", verifyToken, async (req, res) => {
  try {
    const { productId } = req.body;

    const existingItem = await Wishlist.findOne({
      user: req.user.id,
      product: productId,
    });

    if (existingItem) {
      return res.status(400).json({
        message: "Already in Wishlist",
      });
    }

    const wishlistItem = new Wishlist({
      user: req.user.id,
      product: productId,
    });

    await wishlistItem.save();

    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Remove Wishlist Item
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Item Removed Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;