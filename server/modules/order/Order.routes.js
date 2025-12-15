import {Router} from "express"
import { checkLogin } from "../../common/middlewares/checkLogin.middleware.js"
import { MakeOrder } from "./Order.service.js"
const OrderRouter = Router()

OrderRouter.post("/makeOrder",checkLogin,MakeOrder)


export {OrderRouter}