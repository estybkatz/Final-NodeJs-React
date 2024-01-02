import Joi from "joi";

import validation from "./validation";

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(255).required(),
  middleName: Joi.string().min(2).max(255).allow(""),
  lastName: Joi.string().min(2).max(255).required(),
  phone: Joi.string().min(9).max(14).required(),
  email: Joi.string()
    .min(6)
    .max(256)
    .required()
    .email({ tlds: { allow: false } }),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      )
    )
    .min(6)
    .max(10)
    .required()
    .messages({
      "string.pattern.base":
        "the password should be supper protected, this mean that its must contain an uppercase letter and a lowercase letter, and 4 numbers,special sign like #?!@$%^&*-,  and must be atleast of size 8",
    }),
  url: Joi.string().min(6).max(1024).allow(""),
  alt: Joi.string().min(6).max(256).allow(""),
  state: Joi.string().min(2).max(256).allow(""),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.number().min(1).max(256).required(),
  zip: Joi.number().min(0).max(999999999).allow("").allow(null),
  isAdmin: Joi.boolean(),
});

const validateRegisterSchema = (userInput) =>
  validation(registerSchema, userInput);

export default validateRegisterSchema;
