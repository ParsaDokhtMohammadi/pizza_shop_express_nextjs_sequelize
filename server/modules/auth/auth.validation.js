// register.schema.js
import {Joi} from "express-validation"

export const registerSchema = {
  body: Joi.object({
    full_name: Joi.string()
      .min(8)
      .max(32)
      .required()
      .messages({
        "string.empty": "Full name is required",
        "string.min": "Full name must be between 8 and 32 chars",
        "string.max": "Full name must be between 8 and 32 chars",
        "any.required": "Full name is required",
      }),

    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email",
        "any.required": "Full name is required",
      }),

    password: Joi.string()
      .min(8)
      .max(32)
      .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
      .required()
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 chars",
        "string.max": "Password must be at most 32 chars",
        "string.pattern.base": "Password must contain at least one letter and one number",
        "any.required": "Full name is required",
      }),
  }),
};
