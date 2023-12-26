const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  task: { type: String, maxLength: 1024, trim: true, required: true },
  workerToDo: { type: String, maxLength: 256, trim: true, required: true },
  dateOpened: { type: String, minLength: 6, maxLength: 10, required: true },
  lastDateToDo: { type: String, minLength: 6, maxLength: 10, required: true },
  done: { type: Boolean, default: false },
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
  },
});
const Tasks = mongoose.model("tasks", tasksSchema);

module.exports = Tasks;
