import {Router} from "express"
import { checkLogin } from "../../common/middlewares/checkLogin.middleware.js"
import { getOrderById, getOrders, MakeOrder } from "./Order.service.js"
import { validate } from "express-validation"
import { orderSchema } from "./order.validation.js"
const OrderRouter = Router()

OrderRouter.post("",validate(orderSchema),checkLogin,MakeOrder)
OrderRouter.get("",checkLogin,getOrders)
OrderRouter.get("/:order_id",checkLogin,getOrderById)

export {OrderRouter}