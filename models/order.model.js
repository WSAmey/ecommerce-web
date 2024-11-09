const mongoose = require("mongoose");
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    address: {
      type: String,
      required: true,
    },
    orderedAt: {
      type: Date,
      default: Date.now(),
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
  },
  {
    timestamp: true,
  }
);

const orderModel = mongoose.model("order", orderSchema);
module.exports = {
  orderModel,
};
