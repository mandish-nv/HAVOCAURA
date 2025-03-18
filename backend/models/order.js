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
        quantity: { type: Number},
      },
    ],
    parts: {
      CPU: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number},
        },
      ],
      GPU: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number},
        },
      ],
      Motherboard: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number},
        },
      ],
      RAM: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number},
        },
      ],
      Storage: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number},
        },
      ],
      Power_Supply: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number},
        },
      ],
      Cooling_System: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number},
        },
      ],
      Case: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number},
        },
      ],
      Peripherals: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number},
        },
      ],
      Other: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number},
        },
      ],
      HDD: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number},
        },
      ],
      SSD: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
          price: Number,
          quantity: { type: Number},
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
    discount: {
      type: Number,
      default: 0, 
    },
    expectedDeliveryDate: {
      type: Date,
      default: () => {
        const today = new Date();
        return new Date(today.setDate(today.getDate() + 7)); // 7-day delivery
      },
    },
    status: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

const Checkout = mongoose.model("Checkout", checkoutSchema);

module.exports = Checkout;
