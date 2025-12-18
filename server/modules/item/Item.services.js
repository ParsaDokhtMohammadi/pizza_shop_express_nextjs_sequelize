import { nanoid } from "nanoid"
import { itemModel } from "./Item.model.js"

export const createItem = async(req , res , next)=>{
    try{
        const image_url = req.file.destination+"/"+req.file.filename
        res.send(req.file)
    }catch(err){
        next(err)
    }
}