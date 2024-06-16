import userModel from "../schema/userSchema.js"

export const createUser= async(params)=>{
     const createdUser= await userModel.create(params)
     return createdUser
}