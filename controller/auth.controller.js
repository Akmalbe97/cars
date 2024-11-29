const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authSchemas = require("../schema/auth.schema");
const nodemailer = require("nodemailer");
const { generateAccessToken, generateRefreshToken } = require("../utils/generate.token");
require("dotenv").config()

const register = async (req, res, next) => {
  try {
    const { name, surname, email, password, phone, image } = req.body;
    const exsistUser = await authSchemas.findOne({ email });

    if (exsistUser) {
      return res.json({ message: "Email already registered" });
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_GOOGLE_PASS_KEY,
      },
    });

    const randomNumber = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");

    const sendEmail = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Verification code",
      text: `Your verification code: ${randomNumber}`,
    };

    try {
      await transporter.sendMail(sendEmail);
    } catch (error) {
      return res.status(500).json({ message: "Failed to send email", error: error.message });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await authSchemas.create({
      name,
      surname,
      email,
      password: hashPassword,
      phone,
      image,
      verify_code: randomNumber,
    });

    setTimeout(async () => {
      await authSchemas.findByIdAndUpdate(newUser._id, { verify_code: "" });
    }, 60 * 10000);


    res.status(201).json({ 
        message: "user registered successfully", 
        userId: newUser._id 
      });
  } catch (error) {
    next(error);
  }
};

const verify = async (req, res, next) => {
  try {
    const { email, verify_code_client } = req.body;

    const foundUser = await authSchemas.findOne({ email: email });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (foundUser.verify_code === verify_code_client) {
      await authSchemas.findByIdAndUpdate(foundUser._id, { verify: true, verify_code: "" });

      return res.status(200).json({
        message: "Successfully verified",
      });
    } else {
      return res.status(400).json({ message: "Verification code is incorrect or not exsist" });
    }
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next ) => {
  const {email, password} = req.body
  const foundUser = await authSchemas.findOne({email: email})

  if(!foundUser) {
    return res.status(404).json({
      message: "User not found, please register first"
    })
  }

  const chekerPassword = await bcrypt.compare(password, foundUser.password)

  if(!chekerPassword) {
    return res.status(401).json({message: "wrong passsword!"})
  }

  if (foundUser.verify === true) {
      
    const accessToken = generateAccessToken({id: foundUser._id, role: foundUser.role, email: foundUser.email})

    const refreshToken = generateRefreshToken({id: foundUser._id, email: foundUser.email, role: foundUser.role})
    
    res.cookie("accessToken", accessToken, {httpOnly: true, maxAgs: process.env.COOKIE_ACCESS_TIME})
    res.cookie("refreshToken", refreshToken, {httpOnly: true, maxAgs: process.env.COOKIE_REFRESH_TIME})

  res.status(200).json({
    message: "login successful",
    tokens: {
      accessToken
    }
  })
}else {
  return res.status(403).json({ message: "You are not verified" });
}}

const logout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken", {httpOnly: true})
    res.clearCookie("refreshToken", {httpOnly: true})

    res.status(200).json({message: "Logout successful!"})
  } catch (error) {
    next(error)
  }
}
 
module.exports = {
  register,
  verify,
  login,
  logout
}
