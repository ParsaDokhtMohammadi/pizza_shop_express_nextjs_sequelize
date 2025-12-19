import {Router} from "express"
import { checkAdmin } from "../../common/middlewares/checkAdmin.middleware.js"
import { createItem, deleteItem, getAllItems, getItemById, updateItem } from "./Item.service.js"
import { uploadFile } from "../../config/multer.config.js"
import { validate } from "express-validation"
import { ItemSchema } from "./Item.validation.js"
const ItemRouter = Router()

ItemRouter.post("",checkAdmin,uploadFile.single("image"),validate(ItemSchema),createItem)
ItemRouter.post("/:id",checkAdmin,uploadFile.single("image"),validate(ItemSchema),updateItem)
ItemRouter.delete("/:id",checkAdmin,deleteItem)
ItemRouter.get("",getAllItems)
ItemRouter.get("/:id",getItemById)

export {ItemRouter}