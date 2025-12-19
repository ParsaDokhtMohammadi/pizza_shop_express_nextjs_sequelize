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
