import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    
        fname: {
          type: String,
          required:true,
          trim: true
    
        },
        lname: {
          type: String,
         required:true,
          trim: true,
        },
        title: {
          type: String,
          required: true,
          enum: {values:["Mr", "Mrs", "Miss"]}
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        }
      
})

export default mongoose.model(authUser,userSchema)