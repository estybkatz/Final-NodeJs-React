const express = require("express");
const router = express.Router();
const cardsServiceModel = require("../../model/cardsService/cardsService");
const normalizeCard = require("../../model/cardsService/helpers/normalizationCardService");
const cardsValidationService = require("../../validation/cardsValidationService");
const permissionsMiddleware = require("../../middleware/permissionsMiddlewareCard");
const authmw = require("../../middleware/authMiddleware");
const CustomError = require("../../utils/CustomError");
const { logErrorToFile } = require("../../utils/fileLogger");
const tasksServiceModel = require("../../model/taskService/taskService");
const permissionsMiddlewareUser = require("../../middleware/permissionsMiddlewareUser");

// get all tasks, all
//http://localhost:8181/api/cards/tasks
router.get("/", async (req, res) => {
  try {
    const allTasks = await tasksServiceModel.getAlltasks();
    // const allStacksId = allTasks.map((task) => task.id);

    // const customerNameTask = await cardsServiceModel.getCustomerNameById();
    // const normalAllTasks = [...customerNameTask];
    // normalAllTasks.push(...allTasks);

    // //console.log(allTasks);
    // console.log(normalAllTasks);
    // res.json(normalAllTasks);
    res.json(allTasks);
  } catch (err) {
    logErrorToFile(err.msg, 400);
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/cards/tasks/:id
router.post("/:id", authmw, async (req, res) => {
  try {
    console.log("req", req.params.id);
    let params = await cardsValidationService.idUserValidation(req.params.id);
    console.log("PARAMS", params);
    let task = await cardsValidationService.tasksValidation(req.body);
    // let normalCard = await normalizeCard(req.body, req.userData._id);
    let taskToCreate = {
      customerID: params,
      ...task,
    };
    console.log(taskToCreate);
    await tasksServiceModel.createNewTask(taskToCreate);

    res.json({ msg: "ok" });
  } catch (err) {
    logErrorToFile(err, 400);
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/cards/tasks/:id
router.get("/:id", authmw, async (req, res) => {
  try {
    console.log("req", req.params.id);
    let params = await cardsValidationService.idUserValidation(req.params.id);
    console.log("PARAMS", params);

    let costumerPrivateTasks = await tasksServiceModel.getCustomerTasks(
      req.params.id
    );
    console.log(costumerPrivateTasks);
    res.json(costumerPrivateTasks);
  } catch (err) {
    logErrorToFile(err, 400);
    res.status(400).json(err);
  }
});

//http://localhost:8181/api/cards/tasks/toupdate/:id
router.put("/toupdate/:id", authmw, async (req, res) => {
  try {
    console.log("req", req.params.id);
    let params = await cardsValidationService.idUserValidation(req.params.id);
    console.log("PARAMS", params);
    console.log("req111", req.body);
    let taskToUpdate = await tasksServiceModel.updateTask(
      req.params.id,
      req.body
    );
    console.log(taskToUpdate);
    res.json("succsess");
  } catch (err) {
    logErrorToFile(err, 400);
    res.status(400).json(err);
  }
});
//http://localhost:8181/api/cards/tasks/getmytasks/:id
router.get(
  "/getmytasks/:id",
  authmw,
  // permissionsMiddlewareUser(false, false, true),
  async (req, res) => {
    try {
      // console.log("req", req.params.id);
      // let params = await cardsValidationService.idUserValidation(req.params.id);
      // console.log("PARAMS", params);
      // console.log("req111", req.body);
      let myTasks = await tasksServiceModel.getMyTasks(req.userData._id);

      res.json(myTasks);
    } catch (err) {
      logErrorToFile(err, 400);
      res.status(400).json(err);
    }
  }
);
//http://localhost:8181/api/cards/tasks/getmydonetasks/:id
router.get(
  "/getmydonetasks/:id",
  authmw,
  // permissionsMiddlewareUser(false, false, true),
  async (req, res) => {
    try {
      // console.log("req", req.params.id);
      // let params = await cardsValidationService.idUserValidation(req.params.id);
      // console.log("PARAMS", params);
      // console.log("req111", req.body);
      let myDoneTasks = await tasksServiceModel.getMyDoneTasks(
        req.userData._id
      );

      res.json(myDoneTasks);
    } catch (err) {
      logErrorToFile(err, 400);
      res.status(400).json(err);
    }
  }
);
module.exports = router;
