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

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})