const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: true,
    },
    cart: {
      laptops: [
        {
          part: { type: mongoose.Schema.Types.ObjectId, ref: "Laptop" },
          price: Number,
          quantity: { type: Number, required: true, min: 1 },
        },
      ],
      parts: {
        CPU: [
          {
            part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
            price: Number,
            quantity: { type: Number, required: true, min: 1 },
          },
        ],
        GPU: [
          {
            part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
            price: Number,
            quantity: { type: Number, required: true, min: 1 },
          },
        ],
        Motherboard: [
          {
            part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
            price: Number,
            quantity: { type: Number, required: true, min: 1 },
          },
        ],
        RAM: [
          {
            part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
            price: Number,
            quantity: { type: Number, required: true, min: 1 },
          },
        ],
        Storage: [
          {
            part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
            price: Number,
            quantity: { type: Number, required: true, min: 1 },
          },
        ],
        Power_Supply: [
          {
            part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
            price: Number,
            quantity: { type: Number, required: true, min: 1 },
          },
        ],
        Cooling_System: [
          {
            part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
            price: Number,
            quantity: { type: Number, required: true, min: 1 },
          },
        ],
        Case: [
          {
            part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
            price: Number,
            quantity: { type: Number, required: true, min: 1 },
          },
        ],
        Peripherals: [
          {
            part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
            price: Number,
            quantity: { type: Number, required: true, min: 1 },
          },
        ],
        Other: [
          {
            part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
            price: Number,
            quantity: { type: Number, required: true, min: 1 },
          },
        ],
        HDD: [
          {
            part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
            price: Number,
            quantity: { type: Number, required: true, min: 1 },
          },
        ],
        SSD: [
          {
            part: { type: mongoose.Schema.Types.ObjectId, ref: "ComputerPart" },
            price: Number,
            quantity: { type: Number, required: true, min: 1 },
          },
        ],
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
