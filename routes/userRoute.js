import express from "express";
import userController from "../controller/userController.js"
import {checkUserData,checkVerifyEmailData,checkVerifyContactNumber} from "../validator/userDataValidation.js"
import{checkError}from "../validator/index.js"

 const route= express.Router()


 route.post('/create-user',checkUserData(),checkError,userController.userCreate)
 route.post('/verify-email',checkVerifyEmailData(),checkError,userController.verifyEmail)
 route.get('/verify/:token',userController.verifyResFromMail)
 route.post('/verify-contact',checkVerifyContactNumber(),checkError,userController.verifyContactNumber)
 route.post('/verify-otp',userController.verifyOtp)


 export default route