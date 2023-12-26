const config = require("config");
const taskServiceMongo = require("../mongodb/tasks/helpers/taskService");
const dbOption = config.get("dbOption");
const createNewTask = (id, taskToSave) => {
  if (dbOption === "mongo") {
    return taskServiceMongo.createNewTask(id, taskToSave);
  }
};
const getAlltasks = () => {
  if (dbOption === "mongo") {
    return taskServiceMongo.getAlltasks();
  }
};
const getCustomerName = () => {
  if (dbOption === "mongo") {
    return taskServiceMongo.getCustomerName();
  }
};
const getCustomerTasks = (customerID) => {
  if (dbOption === "mongo") {
    return taskServiceMongo.getCustomerTasks(customerID);
  }
};
const getWorkerTasks = (workerToDo) => {
  if (dbOption === "mongo") {
    return taskServiceMongo.getWorkerTasks(workerToDo);
  }
};

const updateTask = (id, taskToUpdate) => {
  if (dbOption === "mongo") {
    return taskServiceMongo.updateTask(id, taskToUpdate);
  }
};
const getMyTasks = (id) => {
  if (dbOption === "mongo") {
    return taskServiceMongo.getMyTasks(id);
  }
};
const getMyDoneTasks = (id) => {
  if (dbOption === "mongo") {
    return taskServiceMongo.getMyDoneTasks(id);
  }
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
