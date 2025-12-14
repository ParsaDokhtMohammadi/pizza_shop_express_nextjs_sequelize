import {Router} from "express"
import { checkLogin } from "../../common/middlewares/checkLogin.middleware.js"
import { addToCartController, deleteFromCartController, getUserCart } from "./Cart.service.js"
const CartRouter = Router()

CartRouter.post("/add",checkLogin,addToCartController)
CartRouter.delete("/delete",checkLogin,deleteFromCartController)
CartRouter.get("/:id",checkLogin,getUserCart)

export {CartRouter}