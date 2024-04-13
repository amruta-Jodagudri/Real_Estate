import bcryptjs from 'bcryptjs';
import User from "../Models/user.model.js";

export const signup =async (req,resp)=>{
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});
    try{
        await newUser.save();
        resp.status(201).json("User Created Successfully");
    }catch(error){
        resp.status(500).json(error.message);
    }
}