import {generateToken, hashPassword, verifyPassword} from "../../common/utils/auth.utils.js";
import {nanoid} from "nanoid";
import createHttpError from "http-errors";
import {UserModel} from "../user/user.model.js";


export const registerController = async (req , res , next)=>{
    try{
        const {full_name,email,password} = req.body;
        if(!full_name || !password || !email)throw createHttpError(400, "full name, email and password is required.");
        const exists = await UserModel.findOne({where : {email:email}})
        if(exists) throw createHttpError(400, "user with this email already exists");
        const hash = hashPassword(password)
        await UserModel.create({id:nanoid(6),email:email,password:hash,full_name:full_name})
        res.status(200).json({ message : "user created successfully." });
    }catch (err){
        next(err)
    }
}
export const loginController = async (req , res , next)=>{
    try{
        const {email,password} = req.body;
        if(!password || !email)throw createHttpError(400, "email and password are required.");
        const user = await UserModel.findOne({where : {email:email}})
        if(!user) throw createHttpError(400, "invalid email or password");
        const isPasswordValid = verifyPassword(password , user.password)
        if(!isPasswordValid) throw createHttpError(400, "invalid email or password");
        const token = generateToken({id : user.id , email : user.email})
        res.cookie("planetPizza",token,{
            maxage : 24 * 60 * 60 * 1000,
            httpOnly : true,
            signed : true,
        })
        res.status(200).json({ message : "login successful." });
    }catch(err){
        next(err)
    }
}