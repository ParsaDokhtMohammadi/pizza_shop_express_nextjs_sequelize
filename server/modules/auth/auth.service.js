import {hashPassword, verifyPassword} from "../../common/utils/auth.utils.js";
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