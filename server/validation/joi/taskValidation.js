const Joi = require("joi");

// Define the custom date validation function for "dd/mm/yyyy" format
// const customDate = Joi.extend((joi) => ({
//   type: "customDate",
//   base: joi.string(),
//   messages: {
//     "customDate.format": "Invalid date format. Use the format dd/mm/yyyy.",
//   },
//   validate(value, helpers) {
//     if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
//       return { value, errors: helpers.error("customDate.format") };
//     }
//     const parsedDate = new Date(value);
//     if (isNaN(parsedDate.getTime())) {
//       return { value, errors: helpers.error("customDate.format") };
//     }
//     return { value: parsedDate };
//   },
// }));

// const taskSchema = Joi.object({
//   task: Joi.string().min(2).max(1024).required(),
//   workerToDo: Joi.string().min(2).max(256).required(),
//   dateOpened: customDate.customDate().min(9).max(10).required(),
//   lastDateToDo: customDate.customDate().min(6).max(10).required(),

//   done: Joi.boolean().required(),
// });

// const taskValidationSchema = (userInput) => taskSchema.validateAsync(userInput);

// module.exports = {
//   taskValidationSchema,
// };

const taskSchema = Joi.object({
  task: Joi.string().min(2).max(1024).required(),
  workerToDo: Joi.string().min(2).max(256).required(),
  dateOpened: Joi.string().min(9).max(10).required(),
  lastDateToDo: Joi.string().min(6).max(10).required(),

  done: Joi.boolean().required(),
  customerID: Joi.string().hex().length(24),
});
const taskValidationSchema = (userInput) => taskSchema.validateAsync(userInput);

module.exports = {
  taskValidationSchema,
};
