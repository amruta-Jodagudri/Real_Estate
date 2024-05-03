import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://firebasestorage.googleapis.com/v0/b/mern-estate-67049.appspot.com/o/1714756655521WhatsApp%20Image%202024-05-03%20at%2010.41.07%20PM.jpeg?alt=media&token=28b5af79-91ec-4b91-8d5d-926b11aeeddb"
    }
},{timestamps:true});

const User = mongoose.model('User',userSchema);

export default User;

