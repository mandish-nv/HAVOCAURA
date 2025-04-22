const mongoose = require("mongoose");

const laptopSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  processor: {
    type: String,
    required: true,
  },
  ram: {
    type: String, 
    required: true,
  },
  storage: {
    type: String, 
    required: true,
  },
  graphicsCard: {
    type: String, 
    default: "Integrated",
  },
  screenSize: {
    type: String, // in inches
    required: true,
  },
  operatingSystem: {
    type: String,
    default: "Windows",
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    default: "",
  },
}, { timestamps: true });

const Laptop = mongoose.model("Laptop", laptopSchema);

module.exports = Laptop;
