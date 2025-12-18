import { nanoid } from "nanoid"
import { itemModel } from "./Item.model.js"

export const createItem = async(req , res , next)=>{
    try{
        res.send("ok")
    }catch(err){
        next(err)
    }
}