import { createUser } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  sendMail,
  sendOTP,
  otpVerification,
} from "../helper.js/verfication.js";

const userCreate = async (req, res) => {
  try {
    const data = req.body;
    const password = data.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    data.password = hashedPass;
    data.createdAt = new Date().toISOString();
    data.updatedAt = new Date().toISOString();
    const { user, error } = await createUser(data);
    if (error) {
      console.log(error);
      return res.status(400).json({ status: error.code, error: error.errmsg });
    }
    return res.status(200).json({ status: true, data: user });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: "Server Error While Creating The User" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { email, fname, lname } = req.body;
    const token = jwt.sign(
      { name: fname, lastname: lname },
      process.env.PUBLIC_KEY,
      { expiresIn: "1m" }
    );

    const { info, err } = await sendMail(token, email);

    if (!info || err) {
      console.log(err);
      return res
        .status(500)
        .json({ status: false, error: "Error While verifing the Email !" });
    }

    return res
      .status(200)
      .json({ status: true, message: "Email Successfully Send !" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: "Server Error While verifing the Email !",
    });
  }
};

export const verifyResFromMail = async (req, res) => {
  try {
    const token = req.params.token;
    const decodedData = await jwt.verify(token, process.env.PUBLIC_KEY);
    if (decodedData) {
      return res.status(200).json({
        status: true,
        Message: "Email Verified Successfully !",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: "Server Error While verifing the Email Response!",
    });
  }
};

const verifyContactNumber = async (req, res) => {
  try {
    const { error, status } = await sendOTP(req.body.contact);
    if (error && !status) {
      console.log(error);
      return res
        .status(400)
        .json({ status: false, error: "Error While verifing the Contact !" });
    }
    return res.json({
      status: true,
      message: "Mobile Number Verify Successfully !",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: "Server Error While verifing the Contact Number!",
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, contact } = req.body;
    const { status, error } = await otpVerification(otp, contact);
    if (error || !status) {
      console.log(error);
      return res.status(400).json({ status: false, error: "OTP Invalid!" });
    }
    res.status(200).json({ status: true, message: "OTP Verified..!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      error: "Server Error While verifing the otp !",
    });
  }
};

export default {
  userCreate,
  verifyEmail,
  verifyResFromMail,
  verifyContactNumber,
  verifyOtp,
};
