import { nanoid } from "nanoid"
import { discountModel } from "./Discount.model.js"
import createHttpError from "http-errors"

export const AddDiscount = async(req , res , next)=>{
    try{
         const {name , code , percentage , limit , start_date , expiration_date} = req.body
         
    }catch(err){
        next(err)
    }
}