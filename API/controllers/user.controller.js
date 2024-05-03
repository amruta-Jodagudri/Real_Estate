import bcryptjs from 'bcryptjs';
import User from "../Models/user.model.js";
import { errorHandler } from "../Utils/error.js";

export const test = (req,resp)=>{
    resp.json({
        message:"API route working!"
    });
};

export const updateUserInfo = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, 'You can only update your own account!'));
        try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
    
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar: req.body.avatar,
            },
            },
            { new: true }
        );
    
        const { password, ...rest } = updatedUser._doc;
    
        res.status(200).json(rest);
        } catch (error) {
            next(error);
        }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only delete your own account!'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!');
    } catch (error) {
        next(error);
    }
};

