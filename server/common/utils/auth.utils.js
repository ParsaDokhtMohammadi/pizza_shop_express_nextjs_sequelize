import {hashSync, genSaltSync, compareSync} from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = (password)=>{
    const salt =  genSaltSync();
    return  hashSync(password,salt)
}

export const verifyPassword = (password,hash)=>{
    return compareSync(password,hash);
}

export const generateToken = (payload)=>{
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn : '1d'})
}

export const verifyToken = (token)=>{
    return jwt.verify(token,process.env.JWT_SECRET)
}