 import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&s'
    }
},{timestamps:true});

 userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'7d'})
    return token
}

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,10)
    }
    next()
})

userSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

const User=mongoose.model('User',userSchema);

export default User;