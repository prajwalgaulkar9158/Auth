import express from "express";
import userController from "../controller/userController.js"
 const route= express.Router()

 route.post('/create-user',userController.createUser)


 export default route