import {Router} from "express"
import { checkAdmin } from "../../common/middlewares/checkAdmin.middleware.js"
import { createItem } from "./Item.services.js"
const ItemRouter = Router()

ItemRouter.post("",checkAdmin,createItem)

export {ItemRouter}