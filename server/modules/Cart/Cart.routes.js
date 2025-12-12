import {Router} from "express"
import { checkLogin } from "../../common/middlewares/checkLogin.middleware.js"
import { addToCartController, deleteFromCartController } from "./Cart.service.js"
const CartRouter = Router()

CartRouter.post("/add",checkLogin,addToCartController)
CartRouter.delete("/delete",checkLogin,deleteFromCartController)

export {CartRouter}