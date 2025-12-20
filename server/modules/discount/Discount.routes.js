import {Router} from  "express"
import { checkAdmin } from "../../common/middlewares/checkAdmin.middleware.js"
import { validate } from "express-validation"
import { DiscountSchema } from "./Discount.validation.js"
import { AddDiscount } from "./Discount.service.js"

const DiscountRouter = Router()
DiscountRouter.post("",checkAdmin,validate(DiscountSchema),AddDiscount)

export {DiscountRouter}