import { createUser } from "../models/userModel.js";
import bcrypt from "bcrypt"
const userCreate = async (req, res) => {
  try {
    const data = req.body;
    const password=data.password
    const salt =await  bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password,salt)
    data.password=hashedPass
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

export default {
  userCreate,
};
