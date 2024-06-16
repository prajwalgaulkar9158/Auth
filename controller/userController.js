import authUSer from "../schema/userSchema.js"

const createUser= async(req,res)=>{
    try {
        const data = req.body
        const user= await authUSer.create(data)
        return res.status(200).json({status:true,data:user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({status:false,error:"Server Error While Creating The User"})
    }
}

export default {
    createUser
}