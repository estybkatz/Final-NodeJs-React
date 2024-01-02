const Joi = require("joi");

const profileSchema = Joi.object({
  name: Joi.object()
    .keys({
      firstName: Joi.string().min(2).max(256).required(),
      middleName: Joi.string().min(2).max(256).allow("").required(),
      lastName: Joi.string().min(2).max(256).required(),
    })
    .required(),
  phone: Joi.string()
    .regex(new RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/))
    .required()
    .messages({
      "string.pattern.base":
        "The phone number must start with 0 and contain only numbers. You can put - after the third digit and it must contain 7-12 digits",
    }),
  email: Joi.string()
    .regex(
      new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
    )
    .email({ tlds: { allow: false } })
    .required()

    .messages({
      "string.pattern.base":
        "The email structure is incorrect, the email must contain English letters and @ for example A@gmail.com",
    }),

  address: Joi.object()
    .keys({
      state: Joi.string().min(2).max(256).allow("").required(),
      country: Joi.string().min(2).max(256).required(),
      city: Joi.string().min(2).max(256).required(),
      street: Joi.string().min(2).max(256).required(),
      houseNumber: Joi.number().min(1).required(),
      zip: Joi.number().allow("", 0),
    })
    .required(),
  isAdmin: Joi.boolean().allow(""),
});

const validateProfileSchema = (userInput) =>
  profileSchema.validateAsync(userInput, { abortEarly: false });

module.exports = {
  validateProfileSchema,
};
