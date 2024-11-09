const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
    },
    totalQuantity: {
      type: String,
      required: [true, "Total quantity is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    discount: [
      {
        percentage: Number,
        startDate: Date,
        endDate: Date,
      },
    ],
  },
  {
    timestamp: true,
  }
);

const productModel = mongoose.model("Product", productSchema);
module.exports = {
  productModel,
};
