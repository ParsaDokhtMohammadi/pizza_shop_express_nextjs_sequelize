import {Router} from "express"
import { checkLogin } from "../../common/middlewares/checkLogin.middleware.js"
import { addToCartController } from "./Cart.service.js"
const CartRouter = Router()

CartRouter.post("/add",checkLogin,addToCartController)

export {CartRouter}