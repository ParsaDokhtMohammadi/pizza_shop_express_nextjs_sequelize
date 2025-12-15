import {Router} from "express"
import { checkLogin } from "../../common/middlewares/checkLogin.middleware.js"
const OrderRouter = Router()

OrderRouter.post("/MakeOrder",checkLogin)


export {OrderRouter}