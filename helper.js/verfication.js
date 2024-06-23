import { smpt, email, twilioClient, twilioConfig } from "../config/config.js";
import _otplib from 'otplib'
import qr from "qrcode"

export const sendMail = async (token, emailTo) => {
  try {
    const mailconfig = {
      from: email,
      to: emailTo,
      subject: "Email Verification !",
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <h2 style="color: #333;">Email Verification</h2>
      <p>Hi there,</p>
      <p>Thank you for visiting our website and entering your email. Please follow the link below to verify your email address:</p>
      <a href="http://localhost:3333/user/verify/${token}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; color: #fff; background-color: #007BFF; text-decoration: none; border-radius: 5px;">Verify Email</a>
      <p>Thanks,</p>
      <p>The Team</p>
    </div>`,
    };

    return smpt
      .sendMail(mailconfig)
      .then((data) => {
        return { info: data };
      })
      .catch((err) => {
        return { err };
      });
  } catch (error) {
    return { error };
  }
};

const storedVerificationOTP = {};

export const sendOTP = async (contact) => {
  try {
    const randomNumber = Math.random() * 9000;
    const otp = Math.floor(randomNumber);
    storedVerificationOTP[contact] = otp;
    await twilioClient.messages.create({
      from: twilioConfig.twilioCnt,
      to: contact,
      body: `Your One Time Password (OTP) For Prajwal First App is ${otp}`,
    });
    return { status: true };
  } catch (error) {
    return { error };
  }
};

export const otpVerification = async (otp, contact) => {
  try {
    if (storedVerificationOTP[contact] == otp) {
      delete storedVerificationOTP[contact]
      return { status: true };
    } else {
      return { status: false };
    }
  } catch (error) {
    return { error };
  }
};

export const generateSecret = () => {
  const secret = _otplib.authenticator.generateSecret();
  return secret;
};

export const generateQRCode = async (secret, user) => {
  const otpauth = _otplib.authenticator.keyuri(user.email, 'prajAuth', secret);
  try {
    const qrCodeImageUrl = await qr.toBuffer(otpauth);
    return qrCodeImageUrl;
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw new Error('Failed to generate QR code');
  }
};


// google auth otp
export const verifyOTP = (token, secret) => {
  return _otplib.authenticator.check(token, secret);
};