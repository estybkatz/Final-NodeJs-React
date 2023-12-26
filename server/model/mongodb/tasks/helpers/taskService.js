const Card = require("../../cards/Card");
const Task = require("../Tasks");

const createNewTask = (id, taskToSave) => {
  const task = new Task(id, taskToSave);
  return task.save();
};
const getAlltasks = () => {
  return Task.find();
};
const getCustomerName = () => {
  return Card.find({}, { firstName: 1, lastName: 1, _id: 1 });
};
const getCustomerTasks = (customerID) => {
  console.log("hlooooooo");
  console.log(customerID);
  return Task.find({ customerID: customerID, done: false });
};

const getWorkerTasks = (workerToDo) => {
  //console.log("hloooooooworker");
  //console.log("workerTodo", workerTodo);
  return Task.find({ workerToDo: workerToDo, done: false });
  //const task = Task.filter((item) => item.workerTodo === workerTodo);
};

const updateTask = (id, taskToUpdate) => {
  return Task.findByIdAndUpdate(id, taskToUpdate, { new: true });
};

const getMyTasks = (id) => {
  return Task.find({
    workerToDo: id,
    done: false,
  });
};
const getMyDoneTasks = (id) => {
  return Task.find({
    workerToDo: id,
    done: true,
  });
};
module.exports = {
  createNewTask,
  getAlltasks,
  getCustomerName,
  getCustomerTasks,
  getWorkerTasks,
  updateTask,
  getMyTasks,
  getMyDoneTasks,
};
//workerTodo
