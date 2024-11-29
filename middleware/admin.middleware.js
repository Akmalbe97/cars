const jwt = require("jsonwebtoken");
const BaseError = require("../utils/baseError");
require("dotenv").config();

const checkAdmin = async (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    throw BaseError.BadRequest("Access token topilmadi");
  }
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    req.email = decoded;

    if (req.email.role !== "admin") {
      throw BaseError.BadRequest("You are not admin");
    }
  } catch (err) {
    throw new Error(err.message);
  }

  return next();
};

module.exports =  checkAdmin;
