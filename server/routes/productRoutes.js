const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const verifyToken =
  require("../middleware/authMiddleware");

// Add Product (ADMIN ONLY)
router.post(
  "/add",
  verifyToken,
  async (req, res) => {
    try {
      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Admin Only",
        });
      }

      const product =
        new Product(req.body);

      await product.save();

      res.status(201).json(product);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// Get All Products
router.get("/", async (req, res) => {
  try {
    const products =
      await Product.find();

    res.json(products);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get Product By ID
router.get("/:id", async (req, res) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message:
          "Product not found",
      });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update Product (ADMIN ONLY)
router.put(
  "/:id",
  verifyToken,
  async (req, res) => {
    try {

      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Admin Only",
        });
      }

      const product =
        await Product.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );

      if (!product) {
        return res.status(404).json({
          message:
            "Product not found",
        });
      }

      res.json(product);

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// Delete Product (ADMIN ONLY)
router.delete(
  "/:id",
  verifyToken,
  async (req, res) => {
    try {

      if (req.user.role !== "admin") {
        return res.status(403).json({
          message: "Admin Only",
        });
      }

      const product =
        await Product.findByIdAndDelete(
          req.params.id
        );

      if (!product) {
        return res.status(404).json({
          message:
            "Product not found",
        });
      }

      res.json({
        message:
          "Product deleted successfully",
      });

    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

module.exports = router;