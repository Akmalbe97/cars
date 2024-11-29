const mongoose = require("mongoose")

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  surname: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  phone: {
    type: String,
    required: true,
    min: 9,
    max: 20
  },
  image: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    enum:{
      values: ["user", "admin", "superAdmin"],
      message: "{VALUE} boshqa role talab qilinadi"
    }
  },
  verify_code: {
    type: String
  },

  verify: {
    type: Boolean,
    default: false,
  }
  
})

const authSchemas = mongoose.model("auth", authSchema)
module.exports = authSchemas