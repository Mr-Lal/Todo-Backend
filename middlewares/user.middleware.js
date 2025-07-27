import BlackListedToken from "../models/BlackListedToken.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';



export const verifyUser=async(req,res,next)=>{
    try {

        const token=req.cookies.token
        if(!token){
            return res.status(401).json({msg:'Unauthorized access, please login'});
        }
        
        const BlackToken=await BlackListedToken.findOne({token})

        if(BlackToken){
            return  res.status(401).json({msg:'Unauthorized access, please login'});
        }
        
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded._id);
        if(!user){
            return res.status(401).json({msg:'Unauthorized access, user not found'});
        }
        req.user=user; // Attach user to request object
        next();
        
    } catch (error) {
        console.error('Error in protectUser middleware:', error);
        res.status(500).json({msg:'Internal server error',error:error.message});
        
    }
}
