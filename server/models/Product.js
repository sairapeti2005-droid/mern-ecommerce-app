const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    price: Number,
    image: String,
    category: String,
    stock: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);