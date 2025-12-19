import { nanoid } from "nanoid"
import { itemModel } from "./Item.model.js"
import createHttpError from "http-errors";

export const createItem = async (req, res, next) => {
    try {
        const { name, category, description, price } = req.body
        const image_url = req.file.destination + "/" + req.file.filename

        await itemModel.create({
            id: nanoid(6),
            name,
            description,
            category,
            price,
            image_url
        })
        res.status(200).json({
            message: "آیتم ساخته شد"
        })
    } catch (err) {
        next(err)
    }
}
export const updateItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, category, description, price } = req.body;
        const item = await itemModel.findByPk(id);
        if (!item) {
            throw createHttpError(404, "محصول یافت نشد");
        }
        if (req.file) {
            item.image_url = `/public/uploads/${req.file.filename}`;
        }

        item.name = name ?? item.name;
        item.category = category ?? item.category;
        item.description = description ?? item.description;
        item.price = price ?? item.price;

        await item.save();

        res.status(200).json({
            message: "محصول با موفقیت بروزرسانی شد",
        });
    } catch (err) {
        next(err);
    }
};

export const deleteItem = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedCount = await itemModel.destroy({where: { id }})
        if (deletedCount === 0) throw createHttpError(404, "محصول یافت نشد");
        res.status(200).json({message: "محصول با موفقیت حذف شد"})
    } catch (err) {
        next(err)
    }
}

export const getAllItems = async(req , res , next)=>{
    try{
        const data = await itemModel.findAll()
        res.status(200).json({message:"محصولات دریافت شدند",data})
    }catch(err){
        next(err)
    }
}
export const getItemById = async(req , res , next)=>{
    try{
        const {id} = req.params
        const data = await itemModel.findByPk(id,{raw:true})
        if(!data)throw createHttpError(404,"محصول یافت نشد")
        res.status(200).json({message:"محصول دریافت شدند",data})
    }catch(err){
        next(err)
    }
}