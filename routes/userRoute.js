import express from "express";
import userController from "../controller/userController.js"
import {checkUserData} from "../validator/userDataValidation.js"
import{checkError}from "../validator/index.js"

 const route= express.Router()


 route.post('/create-user',checkUserData(),checkError,userController.userCreate)


 export default route