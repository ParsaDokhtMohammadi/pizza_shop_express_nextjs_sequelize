import createHttpError from "http-errors";
import { verifyToken } from "../../common/utils/auth.utils.js";
import { cartModel } from "./Cart.model.js";
import { nanoid } from "nanoid";

export const addToCartController = async(req , res,next) =>{
    try{
        const {item_id , quantity} = req.body
        if(!item_id || !quantity) throw createHttpError(400,"فیلد های مورد نیاز ارسال نشده اند")
        if(typeof(+quantity)!=="number"||quantity<=0)throw createHttpError(400,"مقدار نامعتر میباشد")
            const token = req.signedCookies.planetPizza
        const verified = verifyToken(token)
        if(!verified)throw createHttpError(401,"منقضی شده لطفا دوباره وارد شوید")
        const user_id = verified.id
        const [created] = await cartModel.findOrCreate({where:{user_id,item_id},
        defaults:{id:nanoid(6),quantity}})        
        if(created)res.status(200).json({message:"ایتم به سبد خرید اضافه شد"})
        else res.status(200).json({message:"آیتم در سبد خرید آپدیت شد"})
    }catch(err){
        next(err)
    }
}
export const deleteFromCartController = async(req , res , next)=>{
    try{
        const {item_id} = req.body
        if(!item_id) throw createHttpError(400,"فیلد های مورد نیاز ارسال نشده اند")
        const token = req.signedCookies.planetPizza
        const verified = verifyToken(token)
        if(!verified)throw createHttpError(401,"منقضی شده لطفا دوباره وارد شوید")
        const user_id = verified.id
        const deleted = await cartModel.destroy({where:{user_id,item_id}})
        if(!deleted) throw createHttpError(404,"آیتم در سبد خرید یافت نشد")
        res.status(200).json({message:"آیتم از سبد خرید حذف شد"})
        
    }catch(err){
        next(err)
    }
}