import Joi from "joi";

import validation from "./validation";
const taskSchema = Joi.object({
  task: Joi.string().min(2).max(256).required(),
  workerToDo: Joi.string().min(2).max(256).required(),
  dateOpened: Joi.string().min(6).max(10).required().messages({
    "string.empty": "the password should not be empty",
    "string.pattern.base": "its have to be min 6 tags, and max 10",
  }),
  lastDateToDo: Joi.string().min(6).max(10).required().messages({
    "string.empty": "the password should not be empty",
    "string.pattern.base": "its have to be min 6 tags, and max 10",
  }),
  done: Joi.boolean(),
  customerID: Joi.string().hex().length(24),
});
const validateTaskSchema = (userInput) => validation(taskSchema, userInput);

export default validateTaskSchema;
