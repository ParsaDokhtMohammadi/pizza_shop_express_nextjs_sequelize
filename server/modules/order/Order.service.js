import createHttpError from "http-errors"
import { orderModel } from "./order.model.js"
import { cartModel } from "../Cart/Cart.model.js"
import { verifyToken } from "../../common/utils/auth.utils.js"
import { itemModel } from "../item/Item.model.js"
import { discountModel } from "../discount/Discount.model.js"
import {OrderItem} from "../orderItem/OrderItem.model.js"
import { nanoid } from "nanoid"

export const MakeOrder = async (req, res, next) => {
    try {
        const { type, address, discount } = req.body


        if (type !== "pickUp" && type !== "delivery") throw createHttpError(400, "درخواست نامعتبر")
        if (type === "delivery" && !address) throw createHttpError(400, "فیلد های مورد نیاز ارسال نشده اند")
        const cookie = req.signedCookies.planetPizza
        const { id: user_id } = verifyToken(cookie)
        const cartItems = await cartModel.findAll({
            where: { user_id },
            include: [{ model: itemModel, attributes: ['id', 'price'] }],
            raw: true,
            nest: true
        })
        if (!cartItems.length) throw createHttpError(400, "سبد خرید خالی است")
        //discount handler

        const total_amount = cartItems.reduce(
            (sum, c) => sum + c.quantity * c.Item.price, 0)
        const order = await orderModel.create({
            id: nanoid(6),
            user_id,
            amount:total_amount,
            order_type:type,
            address,
            discount,
        })
        await OrderItem.bulkCreate(
            cartItems.map(c => ({
                id:nanoid(6),
                order_id: order.id,
                item_id: c.item_id,
                quantity: c.quantity,
                price_at_purchase: c.Item.price
            }))
        )
        await cartModel.destroy({where:{user_id}})
        res.status(200).json({message:"سفارش ایجاد شد",order_id:order.id,total_amount})

    } catch (err) {
        next(err)
    }
}