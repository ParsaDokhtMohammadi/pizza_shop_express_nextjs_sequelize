import {Router} from "express"
import { checkAdmin } from "../../common/middlewares/checkAdmin.middleware.js"
import { createItem } from "./Item.services.js"
import { uploadFile } from "../../config/multer.config.js"
const ItemRouter = Router()

ItemRouter.post("",checkAdmin,uploadFile.single("image"),createItem)

export {ItemRouter}