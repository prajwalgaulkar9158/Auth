import express from "express"
const route = express.Router()
import userRoute from "../routes/userRoute.js"
import loginRoute from "../routes/loginRoute.js"

route.use('/user',userRoute)
route.use('/login',loginRoute)

export default route