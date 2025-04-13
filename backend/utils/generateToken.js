import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";

export const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn: "3d"});
    
    res.cookie("jwt-netflix",token,{
        maxAge: 15*24*60*60*1000, //15 days
        httpOnly: true,
        sameSite: "strict",
        secure: false,
    })
}