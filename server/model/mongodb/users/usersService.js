const User = require("./Users");
const Task = require("../tasks/Tasks");

const registerUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

const getUserByEmail = (email) => {
  return User.findOne({ email });
};

const getAllUsers = () => {
  return User.find();
};

const getUserdById = (id) => {
  return User.findById(id);
};
const updateUser = (id, userToUpdate) => {
  //normalize user
  return User.findByIdAndUpdate(id, userToUpdate, {
    new: true,
  });
};

const deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};

const updateTimeStamps = (id) => {
  return User.updateTimeStamps(id);
};

const getWorkerTasks2 = (workerTodo) => {
  console.log("hloooooooworker");
  console.log("workerTodo", workerTodo);
  const taskList = Task.find({ workerTodo: workerTodo });
  console.log("task", Task);
  return taskList;
};
module.exports = {
  registerUser,
  getUserByEmail,
  getAllUsers,
  getUserdById,
  deleteUser,
  updateUser,
  getWorkerTasks2,
};
