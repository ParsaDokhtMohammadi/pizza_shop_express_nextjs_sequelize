import { Joi } from "express-validation";

export const ItemSchema = {
  body: Joi.object({
    name: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters",
        "any.required": "Name is required"
      }),

    category: Joi.string()
      .valid("Pizza", "side", "drink")
      .required()
      .messages({
        "any.only": "Category must be Pizza, side, or drink",
        "any.required": "Category is required"
      }),

    description: Joi.string()
      .min(5)
      .required()
      .messages({
        "string.empty": "Description is required",
        "string.min": "Description must be at least 5 characters"
      }),

    price: Joi.number()
      .integer()
      .min(1000)
      .required()
      .messages({
        "number.base": "Price must be a number",
        "number.min": "Price must be at least 1000"
      })
  })
};
