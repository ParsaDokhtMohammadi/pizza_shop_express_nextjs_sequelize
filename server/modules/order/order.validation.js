import { Joi } from "express-validation";

export const orderSchema = {
    body: Joi.object({
        type: Joi.string()
            .valid("pickUp", "delivery")
            .required()
            .messages({
                "any.only": "نوع سفارش فقط می‌تواند pickUp یا delivery باشد",
                "any.required": "نوع سفارش الزامی است",
                "string.base": "نوع سفارش باید رشته باشد"
            }),
    phone_number: Joi.string()
            .pattern(/^(\+98|98|0)?9\d{9}$/)
            .required()
            .messages({
                "string.pattern.base": "شماره موبایل معتبر نیست",
                "string.empty": "شماره مبایل الزامی است"
            }),

        address: Joi.string().when("type", {
            is: "delivery",
            then: Joi.required(),
            otherwise: Joi.optional()
        }),

        discount: Joi.string()
            .trim()
            .optional()
    })
};
