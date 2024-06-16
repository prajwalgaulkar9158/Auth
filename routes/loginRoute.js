import express from "express"
import loginController from "../controller/loginController.js"
const route = express.Router()

route.post('/',loginController.login)

export default route