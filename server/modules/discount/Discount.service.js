import { nanoid } from "nanoid"
import { discountModel } from "./Discount.model.js"
import createHttpError from "http-errors"


export const AddDiscount = async (req, res, next) => {
    try {
        const { name, code, percentage, limit, start_date, expiration_date } = req.body
        const exists = await discountModel.findOne({ where: { code } })
        if (exists) throw createHttpError(409, "یک تخفیف دیگر با این کد وجود دارد")
        await discountModel.create({
            id: nanoid(6),
            name,
            code,
            percentage,
            limit,
            start_date,
            expiration_date
        })
        res.status(200).json({ message: "کد تخفیف ایجاد شد" })
    } catch (err) {
        if (err.name === "SequelizeUniqueConstraintError") {
            return next(createHttpError(409, "یک تخفیف دیگر با این کد وجود دارد"));
        }
        next(err)
    }
}