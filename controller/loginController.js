import { findUser } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { updateUserSecrete } from "../models/userModel.js";

import {
  generateSecret,
  generateQRCode,
  verifyOTP,
} from "../helper.js/verfication.js";
import _otplib from "otplib";

const login = async (req, res) => {
  try {
    const { user, error } = await findUser(req.body.user_name);
    if (error || !user) {
      return res
        .status(404)
        .json({ status: false, message: "User Not Found !" });
    }
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign({ user: user }, process.env.PUBLIC_KEY, {
        expiresIn: "1h",
      });
      req.session.token = token;
      req.session.user = user;
      return res.status(200).json({
        status: true,
        message: "User Successfuly login",
        token: token,
      });
    } else {
      return res
        .status(404)
        .json({ status: false, message: "password incorrect !" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: "Server Error While Login" });
  }
};

const oAuth = async (req, res) => {
  try {
    const { user } = req.body;
    if (!user || !user.email) {
      return res
        .status(400)
        .send({ status: false, message: "User email is required" });
    }

    const secret = generateSecret();
    if (secret) {
      const { user: updatedUser, error } = await updateUserSecrete(
        user.email,
        secret
      );
      if (error) {
        return res
          .status(400)
          .send({ status: false, message: "User secret updation failed !" });
      }
    }

    const qrCodeBuffer = await generateQRCode(secret, user);

    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": qrCodeBuffer.length,
      "x-secret": secret,
    });
    res.end(qrCodeBuffer);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, error: "Server Error While doing google-oauth" });
  }
};



const verifyGoogleOtp = async (req, res) => {
  try {
    const { token, secret } = req.body;
    const isValid = verifyOTP(token, secret);

    if (isValid) {
      res.status(200).json({status:true,message:"User Verified!..."})
    } else {
      res.status(400).json({status:false,message:"User  Not Verified!..."})
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        status: false,
        error: "Server Error While doing verifyGoogleOtp",
      });
  }
};


export default {
  login,
  oAuth,
  verifyGoogleOtp,
};
