import { validationResult } from "express-validator";

export const checkError = async (req, res, next) => {
  try {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      let error = "";
      await Promise.all(errors.map((err) => error=error + "," + err.msg));
      return res.status(400).json({ status: false, error: error });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, error: error.message });
  }
};
