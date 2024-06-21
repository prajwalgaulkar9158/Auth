import { check, body, validationResult } from "express-validator";

export const checkUserData = () => {
  const userdata = [
    body("fname").trim().notEmpty().withMessage("First name is required"),
    body("lname").trim().notEmpty().withMessage("Last name is required"),
    body("title").isIn(["Mr", "Mrs", "Miss"]).withMessage("Invalid title"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("username").trim().notEmpty().withMessage("username is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("role")
      .isIn(["admin", "teacher", "student", "parent"])
      .withMessage("Invalid role"),
    body("dateOfBirth")
      .optional()
      .notEmpty()
      .withMessage("Invalid date of birth"),
    body("phone").optional().trim(),
    body("address.street").optional().trim(),
    body("address.city").optional().trim(),
    body("address.state").optional().trim(),
    body("address.pin").optional().trim(),
    body("address.country").optional().trim(),
  ];
  return userdata;
};

export const checkVerifyEmailData = () => {
  const userdata = [
    body("fname").trim().notEmpty().withMessage("First name is required"),
    body("lname").trim().notEmpty().withMessage("Last name is required"),
    body("email").isEmail().withMessage("Invalid email address"),

  ];
  return userdata;
};

export const checkVerifyContactNumber=()=>{
  const userData=[
    body("fname").trim().notEmpty().withMessage("First name is required"),
    body("lname").trim().notEmpty().withMessage("Last name is required"),
    body("contact").notEmpty().withMessage("Phone number Required")

  ]
  return userData;

}
