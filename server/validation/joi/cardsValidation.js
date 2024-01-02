const Joi = require("joi");

const createCardSchema = Joi.object({
  firstName: Joi.string().min(2).max(256).required(),
  lastName: Joi.string().min(2).max(256).required(),
  phone: Joi.string().min(9).max(14).required(),
  email: Joi.string()
    .min(6)
    .max(256)
    .required()
    .email({ tlds: { allow: false } }),
  ReceptionDateAtTheOffice: Joi.string().min(6).max(14).required(),
  clubMember: Joi.boolean(),
  BusinessDescription: Joi.string().min(2).max(1024).required(),
  country: Joi.string().min(2).max(256).allow(""),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.string().min(1).max(256).required(),
  zip: Joi.number().min(0).max(99999999).allow(""),
  user_id: Joi.string().hex().length(24),
});

const validateCardSchema = (userInput) => {
  return createCardSchema.validateAsync(userInput, { abortEarly: false });
};

module.exports = {
  validateCardSchema,
};
