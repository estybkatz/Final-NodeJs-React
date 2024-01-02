const Joi = require("joi");
const taskSchema = Joi.object({
  task: Joi.string().min(2).max(1024).required(),
  workerToDo: Joi.string().min(2).max(256).required(),
  dateOpened: Joi.string().min(6).max(10).required(),
  lastDateToDo: Joi.string().min(6).max(10).required(),
  done: Joi.boolean().required(),
  customerID: Joi.string().hex().length(24),
});
const taskValidationSchema = (userInput) => taskSchema.validateAsync(userInput);

module.exports = {
  taskValidationSchema,
};
