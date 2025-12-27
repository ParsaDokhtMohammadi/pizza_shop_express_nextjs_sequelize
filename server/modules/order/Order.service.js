import createHttpError from "http-errors"
import { orderModel } from "./order.model.js"
import { cartModel } from "../Cart/Cart.model.js"
import { verifyToken } from "../../common/utils/auth.utils.js"
import { itemModel } from "../item/Item.model.js"
import { discountModel } from "../discount/Discount.model.js"
import { OrderItem } from "../orderItem/OrderItem.model.js"
import { nanoid } from "nanoid"
import { Op } from "sequelize"


export const MakeOrder = async (req, res, next) => {
    try {
        const { type, address, discount, phone_number } = req.body


        if (type !== "pickUp" && type !== "delivery") throw createHttpError(400, "درخواست نامعتبر")
        if (!phone_number) throw createHttpError(400, "فیلد های مورد نیاز ارسال نشده اند")
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
        let discountPercentage = 0
        let discountId = null
        if (discount) {
            const exists = await discountModel.findOne({
                where: {
                    code: discount,
                    limit: { [Op.gt]: 0 }
                }
            })

            if (!exists) throw createHttpError(404, "کد تخفیف یافت نشد")
            if (new Date(exists.expiration_date) <= new Date())
                throw createHttpError(400, "کد تخفیف منقضی شده است")

            discountPercentage = exists.percentage
            discountId = exists.id

            await discountModel.decrement("limit", {
                by: 1,
                where: { id: exists.id }
            })

        }
        const total_amount = cartItems.reduce(
            (sum, c) => sum + c.quantity * c.Item.price * ((100 - discountPercentage) / 100), 0)
        console.log(total_amount);

        const order = await orderModel.create({
            id: nanoid(6),
            user_id,
            amount: total_amount,
            order_type: type,
            phone_number,
            address,
            discount_id: discountId,
        })
        await OrderItem.bulkCreate(
            cartItems.map(c => ({
                id: nanoid(6),
                order_id: order.id,
                item_id: c.item_id,
                quantity: c.quantity,
                price_at_purchase: c.Item.price
            }))
        )
        await cartModel.destroy({ where: { user_id } })
        res.status(200).json({ message: "سفارش ایجاد شد", order_id: order.id, total_amount })

    } catch (err) {
        next(err)
    }
}
export const getOrders = async (req, res, next) => {
    try {
        const cookie = req.signedCookies.planetPizza
        const { id: user_id } = verifyToken(cookie)
        const orders = await OrderItem.findAll({
            include: [
                {
                    model: orderModel,
                    foreignKey: "order_id",
                    where: { user_id }
                },
                {
                    model: itemModel,
                    foreignKey: "item_id"
                },

            ],
            attributes: { exclude: ["order_id", "item_id"] }
            , raw: true
            , nest: true
        })
        res.status(200).json({ message: "سفارشات دریافت شد", data: orders })
    } catch (err) {
        next(err)
    }
}
export const getOrderById = async (req, res, next) => {
    try {
        const { order_id } = req.params
        if (!order_id) throw createHttpError(400, "درخواست نامعتبر")
        const cookie = req.signedCookies.planetPizza
        const { id: user_id } = verifyToken(cookie)
        const order = await OrderItem.findAll({
            include: [
                {
                    model: orderModel,
                    foreignKey: "order_id",
                    where: { user_id, id: order_id }
                },
                {
                    model: itemModel,
                    foreignKey: "item_id"
                },

            ],
            attributes: { exclude: ["order_id", "item_id"] }
            , raw: true
            , nest: true
        })
        if (order.length === 0) throw createHttpError(404, "سفارش موردنظر یافت نشد")
        res.status(200).json({ message: "سفارش دریافت شد", data: order })
    } catch (err) {
        next(err)
    }
}
