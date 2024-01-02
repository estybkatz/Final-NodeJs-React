const express = require("express");
const router = express.Router();

const cardsValidationService = require("../../validation/cardsValidationService");
const authmw = require("../../middleware/authMiddleware");

const { logErrorToFile } = require("../../utils/fileLogger");
const tasksServiceModel = require("../../model/taskService/taskService");

// get all tasks, all
//http://localhost:8181/api/cards/tasks
router.get("/", authmw, async (req, res) => {
  try {
    const allTasks = await tasksServiceModel.getAlltasks();

    res.json(allTasks);
  } catch (err) {
    logErrorToFile(err.msg, 400);
    res.status(400).json(err);
  }
});

//create new tasks
//http://localhost:8181/api/cards/tasks/:id
router.post("/:id", authmw, async (req, res) => {
  try {
    let params = await cardsValidationService.idUserValidation(req.params.id);

    let task = await cardsValidationService.tasksValidation(req.body);

    let taskToCreate = {
      customerID: params,
      ...task,
    };

    await tasksServiceModel.createNewTask(taskToCreate);

    res.json({ msg: "ok" });
  } catch (err) {
    logErrorToFile(err, 400);
    res.status(400).json(err);
  }
});
//get tasks of a given worker
//http://localhost:8181/api/cards/tasks/:id
router.get("/:id", authmw, async (req, res) => {
  try {
    //let params = await cardsValidationService.idUserValidation(req.params.id);

    let costumerPrivateTasks = await tasksServiceModel.getCustomerTasks(
      req.params.id
    );

    res.json(costumerPrivateTasks);
  } catch (err) {
    logErrorToFile(err, 400);
    res.status(400).json(err);
  }
});
// Finish task
//http://localhost:8181/api/cards/tasks/toupdate/:id
router.put("/toupdate/:id", authmw, async (req, res) => {
  try {
    let params = await cardsValidationService.idUserValidation(req.params.id);
    let taskToUpdate = await tasksServiceModel.updateTask(
      req.params.id,
      req.body
    );
    res.json("succsess");
  } catch (err) {
    logErrorToFile(err, 400);
    res.status(400).json(err);
  }
});
//Get the tasks of a worker
//http://localhost:8181/api/cards/tasks/getmytasks/:id
router.get(
  "/getmytasks/:id",
  authmw,

  async (req, res) => {
    try {
      let myTasks = await tasksServiceModel.getMyTasks(req.userData._id);

      res.json(myTasks);
    } catch (err) {
      logErrorToFile(err, 400);
      res.status(400).json(err);
    }
  }
);
//get worker's done tasks
//http://localhost:8181/api/cards/tasks/getmydonetasks/:id
router.get("/getmydonetasks/:id", authmw, async (req, res) => {
  try {
    let myDoneTasks = await tasksServiceModel.getMyDoneTasks(req.userData._id);

    res.json(myDoneTasks);
  } catch (err) {
    logErrorToFile(err, 400);
    res.status(400).json(err);
  }
});
module.exports = router;
