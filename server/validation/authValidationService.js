const config = require("config");
const joiRegisterValidation = require("./joi/registerValidation");
const joiLoginValidation = require("./joi/loginValidation");
const joiIdValidation = require("./joi/idValidation");
const joiProfileValidation = require("./joi/profileValidation");
const validatorOption = config.get("validatorOption");

const registerUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiRegisterValidation.validateRegisterSchema(userInput);
  }
  throw new Error("validator undefined");
};
const loginUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiLoginValidation.validateLoginSchema(userInput);
  }

  throw new Error("validator undefined");
};

const idUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiIdValidation.validateIdSchema(userInput);
  }
  throw new Error("validator undefined");
};
const profileValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiProfileValidation.validateProfileSchema(userInput);
  }
  throw new Error("validator undefined");
};

module.exports = {
  registerUserValidation,
  loginUserValidation,
  idUserValidation,
  profileValidation,
};
