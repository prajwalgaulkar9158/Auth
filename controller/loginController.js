import { findUser } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
      req.session.token=token
      req.session.user=user
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

export default {
  login,
};
