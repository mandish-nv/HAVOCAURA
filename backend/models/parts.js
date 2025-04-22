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
        "HDD", 
        "SSD" 
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
      type: String, 
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String, 
      default: "",
    }
  },
  { timestamps: true }
);

const ComputerPart = mongoose.model("ComputerPart", computerPartSchema);

module.exports = ComputerPart;
