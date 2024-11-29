const mongoose = require("mongoose")

const modelsSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  cars_info: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cars"
  }]
},
{
  versionKey: false,
  timestamps: true
})
const carModelsSchema = mongoose.model("Model", modelsSchema)
module.exports = carModelsSchema