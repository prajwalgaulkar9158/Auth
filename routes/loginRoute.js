import express from "express"
import loginController from "../controller/loginController.js"
import {checkGoogleAuth,checkGoogleResAuth} from "../validator/userDataValidation.js"
import {checkError} from "../validator/index.js"
const route = express.Router()

route.post('/',loginController.login)
route.post('/google-o-auth',checkGoogleAuth(),checkError,loginController.oAuth)
route.post('/verify-google-auth',checkGoogleResAuth(),checkError,loginController.verifyGoogleOtp)

export default route