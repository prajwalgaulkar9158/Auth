import express from "express"
const route = express.Router()
import userRoute from "../routes/userRoute.js"

route.use('/user',userRoute)

export default route