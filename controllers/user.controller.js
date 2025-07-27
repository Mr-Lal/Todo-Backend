import { cookie, validationResult } from "express-validator";
import { registerService,loginService } from "../services/user.service.js";
import User from "../models/user.model.js";
import uploadImage from "../utils/imageket.js";
import BlackListedToken from '../models/BlackListedToken.js'



export const registerUser=async(req,res)=>{
    try {
if(!validationResult(req).isEmpty()) {
    return res.status(400).json({ errors: validationResult(req).array() });
}

  if(!req.file){
        return res.send('file not found')
    }
 const file = req.file;
    const uploaded = await uploadImage.upload({
      file: file.buffer, 
      fileName: file.originalname,
    });

  
    const url =uploaded.url

const { name, email, password } = req.body;
const userExists=await User.findOne({email})
if(userExists){
    return     res.status(400).json({message: 'User already exists'});
        
    }
const user=await registerService({ name, email, password ,url});

global.io.emit('profileInfo', user);

const token=user.generateAuthToken()
res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict' 
})

res.status(201).json({msg:'User registered successfully', user,token})
   

    } catch (error) {
        console.log('error on registering user:',error);
        
    }
}

export const login=async(req,res)=>{
    try {
        
        if(!validationResult(req).isEmpty()){
            return res.status(400).json({ errors: validationResult(req).array() });
        }

        const {email,password}=req.body;
        
        const user=await loginService({email,password})

        const token=user.generateAuthToken();
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict' 
        });
        res.status(200).json({msg:'User logged in successfully', user,token})
    } catch (error) {
        res.status(500).json({msg:'Error logging in user',error:error.message});
    }
}

export const Logout=async(req,res)=>{
    try {
      const token = req.cookies.token;
        await BlackListedToken.create({
    token,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hour expiry
  });

        res.clearCookie('token');
        res.status(200).json({msg:'User logged out successfully'});
    } catch (error) {
        res.status(500).json({msg:'Error logging out user',error:error.message});
    }
}

export const Profile=async(req,res)=>{
    try {
        
        const userId = req.user._id; 
        const user = await User.findById(userId).select('-password'); 
       const token = req.cookies.token;
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ msg: 'User profile fetched successfully', user ,token});
    } catch (error) {
        res.status(500).json({msg:'Error fetching user profile',error:error.message});
        console.log('Error fetching user profile:', error);
        
        
    }
}