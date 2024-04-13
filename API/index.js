import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRouter from './Routes/auth.route.js';
import userRouter from './Routes/user.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to Mongodb")
}).catch((err) => {
    console.log(err)
});

const app = express();

app.use(express.json());

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.use((err,req,resp,next)=>{
    const statuscode = err.statuscode || 500;
    const message = err.message || 'Internal Server Error';
    return resp.status(statuscode).json({
        success:false,
        statuscode,
        message
    });
})


app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})