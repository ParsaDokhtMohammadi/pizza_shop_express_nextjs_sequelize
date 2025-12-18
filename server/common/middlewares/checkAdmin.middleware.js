import createHttpError from "http-errors"
import { verifyToken } from "../utils/auth.utils"

export const checkAdmin = (req,res,next)=>{
    try{
        const token = req.signedCookies.pizzaPlanet
        if(!token) throw createHttpError(401,"وارد اکانت خود شوید")
        const verify = verifyToken(token)
        if(token.role!=="admin")throw createHttpError(401,"شما به این بخش دسترسی ندارید")
        next()
    }catch(err){
        next(err)
    }
}