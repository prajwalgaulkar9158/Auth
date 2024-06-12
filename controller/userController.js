import mongoose from "mongoose";
// import userModel from "../model/userModel";

const createUser= async(req,res)=>{
    try {
        return res.status(200).json({status:true,data:"true"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:false,error:"Server Error While Creating The User"})
    }
}

export default {
    createUser
}