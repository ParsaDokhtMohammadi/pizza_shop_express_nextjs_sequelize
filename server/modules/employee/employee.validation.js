import { Joi } from "express-validation";

export const EmployeeSchema = {
  body: Joi.object({
    social_code: Joi.string()
      .pattern(/^\d{10}$/)
      .required()
      .messages({
        "any.required": "کد ملی الزامی است",
        "string.empty": "کد ملی الزامی است",
        "string.pattern.base": "کد ملی باید ۱۰ رقم باشد"
      }),

    full_name: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        "any.required": "نام و نام خانوادگی الزامی است",
        "string.empty": "نام و نام خانوادگی الزامی است",
        "string.min": "نام باید حداقل ۳ کاراکتر باشد",
        "string.max": "نام نباید بیشتر از ۵۰ کاراکتر باشد"
      }),

    email: Joi.string()
      .email()
      .required()
      .messages({
        "any.required": "ایمیل الزامی است",
        "string.email": "ایمیل نامعتبر است"
      }),

    phone_number: Joi.string()
      .pattern(/^09\d{9}$/)
      .required()
      .messages({
        "any.required": "شماره تماس الزامی است",
        "string.pattern.base": "شماره تماس معتبر نیست"
      })
  }).unknown(true)
};
