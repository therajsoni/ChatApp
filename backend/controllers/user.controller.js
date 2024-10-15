import {User} from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const register = async(req,res) => {
    try {
    const {
        fullName,
        username,
        password,
        confirmPassword
        ,gender
    } = req.body;
    if(!fullName || !username || !password || !confirmPassword || !gender){
        return res.status(400).json({message:"All fields are required"});
    } 
    if(password !== confirmPassword){
        return res.status(400).json({message : "password not match"});
    }
    const user = await User.findOne({username});
    if(user){
        return res.status(400).json({message : "try with different username"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    // user avatar placeholder here https://avatar.iran.liara.run/public/boy

    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`
  
    await User.create({
        fullName,
        username,
        password:hashedPassword,
        profilePhoto:gender==="male"?maleProfilePhoto:femaleProfilePhoto,
        gender
    })

    res.status(201).json({
        message : "user register",
        success : true
    })

    } catch (error) {
        console.log(error);        
    }
}


export const login = async(req,res) => {
    try {
        const {
            username,
            password,
            
        } = req.body;
        if(!username || !password ){
            return res.status(400).json({message:"All fields are required"});
        } 
       
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message : "user not asseted username"});
        }
    
        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            res.status(401).json({
                message : "password not match",
                success : false
            })
        }

        const tokenData = {
            userId : user._id,
        }

        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'1d'});

        // jwt.verify(TOKEN,process.env.JWT_SECRET_KEY,(err,decoded)=>{
        // if(err)log(err)
        // return decoded
        // })

        // refreshToken = jwt.sign(tokenData,process.env.JWT_REFRESHJWT_KEY,{expiresIn:'100y'})
        // jwt.verify(refreshToken,process.env.JWT_REFRESHJWT_KEY,(err,decoded)=>{
        // 
        // })

        return res.status(201).cookie("token",token ,{maxAge  : 1*24*60*60*1000 , httpOnly : true , sameSIte : 'strict' }).json({
           _id : user._id, // 
           username : user.username,
           fullName :user.fullName,
           profilePhoto : user.profilePhoto  
        })
        
    
        res.status(201).json({
            message : "user register",
            success : true
        })
    
        } catch (error) {
            console.log(error);        
        }
};
export const logout = async(req,res) => {
try {
    
    return res.status(200).cookie("token","",{maxAge:0}).json({
        message : "user logout",
        success : true
    })

} catch (error) {
    console.log(error);    
}
};
export const getOtherUsers = async(req,res) => {
    try {
        const loggedInUserId = req.id;//
        const otherusers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        return res.status(200).json(otherusers);
    } catch (error) {
        console.log(error);        
    }
};
