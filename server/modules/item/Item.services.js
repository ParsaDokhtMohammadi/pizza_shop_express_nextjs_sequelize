import { nanoid } from "nanoid"
import { itemModel } from "./Item.model.js"

export const createItem = async(req , res , next)=>{
    try{
        const {name , category , description , price} = req.body
        const image_url = req.file.destination+"/"+req.file.filename

        await itemModel.create({
            id:nanoid(6),
            name,
            description,
            category,
            price,
            image_url
        })
        res.status(200).json({
            message:"آیتم ساخته شد"
        })
    }catch(err){
        next(err)
    }
}