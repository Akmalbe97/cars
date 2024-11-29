const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  price: {
    type: String,
    required: [true, "price is required"],
  },
  mini_image: {
    type: String,
    required: [true, "mini_image is required"],
  },
  marka: {
    type: String,
    required: [true, "marka is required"],
  },
  tanirovka: {
    type: String,
    required: [true, "tanirovka is required"],
  },
  motor: {
    type: Number,
    required: [true, "motor is required"],
    min: [0.8, "Motor size must be at least 0.8 liters"],
    max: [4, "Motor size must not exceed 4 liters"],
  },
  year: {
    type: Number,
    required: [true, "year is required"],
    min: [2000, "Year must be after the invention of cars (2000)"],
    max: [new Date().getFullYear(), "Year cannot be in the future"],
  },
  color: {
    type: String,
    required: [true, "color is required"],
  },
  distance: {
    type: Number,
    required: [true, "distance is required"],
  },
  gearbox: {
    type: String,
    required: [true, "gearbox is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  total_price: {
    type: String,
    required: [true, "total_price is required"],
  },
  images: [{
    type: String,
    required: [true, "internal image is required"],
  }],
  owner_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },
},
{
  versionKey: false,
  timestamps: true
});
const carsSchemas = mongoose.model("Cars", carsSchema)
module.exports = carsSchemas
