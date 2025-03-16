const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    laptops: [
      {
        part: { type: mongoose.Schema.Types.ObjectId, ref: "Laptop" },
        price: Number,
        quantity: { type: Number, default: 0 },
      },
    ],
    parts: {
      CPU: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number, default: 0 },
        },
      ],
      GPU: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number, default: 0 },
        },
      ],
      Motherboard: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number, default: 0 },
        },
      ],
      RAM: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number, default: 0 },
        },
      ],
      Storage: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number, default: 0 },
        },
      ],
      Power_Supply: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number, default: 0 },
        },
      ],
      Cooling_System: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number, default: 0 },
        },
      ],
      Case: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number, default: 0 },
        },
      ],
      Peripherals: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number, default: 0 },
        },
      ],
      Other: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number, default: 0 },
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
