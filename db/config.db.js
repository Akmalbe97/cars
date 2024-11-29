const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose
      .connect(process.env.MONGOURI)
      .then(() => console.log("Connected"))
      .catch((error) => console.log(error));
  } catch (error) {
    throw console.log(error.message);
    
  }
}

module.exports = connectDB
