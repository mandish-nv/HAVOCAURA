const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    parts: {
      CPU: {
        part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
        price: Number,
      },
      GPU: {
        part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
        price: Number,
      },
      Motherboard: {
        part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
        price: Number,
      },
      RAM: {
        part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
        price: Number,
      },
      Storage: {
        part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
        price: Number,
      },
      Power_Supply: {
        part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
        price: Number,
      },
      Cooling_System: {
        part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
        price: Number,
      },
      Case: {
        part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
        price: Number,
      },
      Peripherals: {
        part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
        price: Number,
      },
      Other: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
        },
      ],
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingCost: {
      type: Number,
      default: 100,
    },
    tax: {
      type: Number,
      default: 0.1, // 10% tax
    },
    expectedDeliveryDate: {
      type: Date,
      default: () => {
        const today = new Date();
        return new Date(today.setDate(today.getDate() + 7)); // 7-day delivery
      },
    },
  },
  { timestamps: true }
);

const Checkout = mongoose.model("Checkout", checkoutSchema);

module.exports = Checkout;
