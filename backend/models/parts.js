const mongoose = require("mongoose");

const computerPartSchema = new mongoose.Schema(
  {
    model: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "CPU",
        "GPU",
        "Motherboard",
        "RAM",
        "Storage",
        "Power Supply",
        "Cooling System",
        "Case",
        "Peripherals",
        "Other",
      ],
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    specifications: {
      type: String, // This allows flexibility for different types of parts
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String, // Store image URL or file path
      default: "",
    }
  },
  { timestamps: true }
);

const ComputerPart = mongoose.model("ComputerPart", computerPartSchema);

module.exports = ComputerPart;
