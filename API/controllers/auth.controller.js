import bcryptjs from 'bcryptjs';
import User from "../Models/user.model.js";
import { errorHandler } from '../Utils/error.js';

export const signup =async (req,resp,next)=>{
    const {username,email,password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password:hashedPassword});
    try{
        await newUser.save();
        resp.status(201).json("User Created Successfully");
    }catch(error){
        next(errorHandler(550,'error from function'));
    }
};