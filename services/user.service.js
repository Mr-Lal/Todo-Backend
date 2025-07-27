import User from "../models/user.model.js";
import bcrypt from 'bcrypt'


export const registerService=async({name,email,password,url})=>{
try {
    
    


    const user=await User.create({name,email,password,profilePicture:url});

  return user
} catch (error) {
    console.log('Error in registerService:', error.message);
        throw error
}
}

export const loginService=async({email,password})=>{
    try {
        const user=await User.findOne({email})
if(!user){
    throw new Error('Invalid email or password')
}


const isMatch= user.comparePassword(password)
if(!isMatch){
    throw new Error('Invalid email or password')
}

return user

    } catch (error) {
        console.log('Error in loginService:', error);
        throw error;
        
        
        
    }
}