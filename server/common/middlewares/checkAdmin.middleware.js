import createHttpError from "http-errors"
import { verifyToken } from "../utils/auth.utils.js"

export const checkAdmin = (req,res,next)=>{
    try{
        const token = req.signedCookies.planetPizza      
        if(!token) throw createHttpError(401,"وارد اکانت خود شوید")
        const verify = verifyToken(token)
        if(verify.role!=="admin")throw createHttpError(401,"شما به این بخش دسترسی ندارید")
        next()
    }catch(err){
        next(err);
    }
}