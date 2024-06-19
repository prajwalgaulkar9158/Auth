import nodemailer from "nodemailer";
import { smpt, email } from "../config/config.js";

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
