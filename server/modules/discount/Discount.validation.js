import { Joi } from "express-validation";

export const DiscountSchema = {
  body: Joi.object({
    name: Joi.string()
      .min(4)
      .max(30)
      .required()
      .messages({
        "any.required": "اسم الزامی است",
        "string.base": "نام باید رشته باشد",
        "string.empty": "نام الزامی است",
        "string.min": "نام باید حداقل ۴ کاراکتر باشد",
        "string.max": "نام نباید بیشتر از ۳۰ کاراکتر باشد"
      }),
    code: Joi.string()
      .min(3)
      .max(20)
      .required()
      .messages({
        "any.required": "کد تخفیف الزامی است",
        "string.base": "کد تخفیف باید رشته باشد",
        "string.empty": "کد تخفیف الزامی است",
        "string.min": "کد تخفیف باید حداقل ۳ کاراکتر باشد",
        "string.max": "کد تخفیف نباید بیشتر از ۲۰ کاراکتر باشد"
      }),
    percentage: Joi.number()
      .min(1)
      .max(100)
      .required()
      .messages({
        "any.required": "درصد تخفیف الزامی است",
        "number.base": "درصد تخفیف باید عدد باشد",
        "number.min": "درصد تخفیف باید حداقل 1 باشد",
        "number.max": "درصد تخفیف نباید بیشتر از 100 باشد"
      }),
    limit: Joi.number()
      .min(1)
      .optional()
      .messages({
        "number.base": "حداکثر استفاده باید عدد باشد",
        "number.min": "حداکثر استفاده حداقل باید 1 باشد"
      }),
    start_date: Joi.date()
      .optional()
      .messages({
        "date.base": "تاریخ شروع نامعتبر است"
      }),
    expiration_date: Joi.date()
      .greater(Joi.ref("start_date"))
      .optional()
      .messages({
        "date.base": "تاریخ انقضا نامعتبر است",
        "date.greater": "تاریخ انقضا باید بعد از تاریخ شروع باشد"
      })
  })
};
