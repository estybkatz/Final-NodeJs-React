const express = require("express");
const router = express.Router();
const cardsServiceModel = require("../../model/cardsService/cardsService");
const normalizeCard = require("../../model/cardsService/helpers/normalizationCardService");
const cardsValidationService = require("../../validation/cardsValidationService");
const permissionsMiddleware = require("../../middleware/permissionsMiddlewareCard");
const authmw = require("../../middleware/authMiddleware");
const CustomError = require("../../utils/CustomError");
const { logErrorToFile } = require("../../utils/fileLogger");

// get all cards all
//http://localhost:8181/api/cards
router.get("/", async (req, res) => {
  try {
    const allCards = await cardsServiceModel.getAllCards();
    res.json(allCards);
  } catch (err) {
    logErrorToFile(err.msg, 400);
    res.status(400).json(err);
  }
});
//my cards, registered
//http://localhost:8181/api/cards/my-cards
router.get(
  "/my-cards",
  authmw,

  async (req, res) => {
    try {
      const Cards = await cardsServiceModel.getAllCards();
      const myCards = Cards.filter((card) => card.user_id == req.userData._id);

      if (myCards.length) res.json(myCards);
      else {
        res.status(200).json([]);
      }
    } catch (err) {
      logErrorToFile(err, 400);
      res.status(400).json(err);
    }
  }
);
///http://localhost:8181/api/cards/fav-cards
router.get(
  "/fav-cards",
  authmw,

  async (req, res) => {
    try {
      let user = req.userData;

      const cards = await cardsServiceModel.findMylikescards(user._id);
      res.json(cards);
    } catch (err) {
      logErrorToFile(err, 500);

      return res.status(500).send(err);
    }
  }
);
// all
//http://localhost:8181/api/cards/:id
router.get("/:id", async (req, res) => {
  try {
    await cardsValidationService.idUserValidation(req.params.id);
    const cardFromDB = await cardsServiceModel.getCardById(req.params.id);
    if (!cardFromDB) throw new CustomError("There exists no card with the id");
    res.json(cardFromDB);
  } catch (err) {
    if (err instanceof CustomError) logErrorToFile(err.msg, 400);
    else logErrorToFile(err, 400);
    res.status(400).json(err);
  }
});
// create cards, biz only
//http://localhost:8181/api/cards/createCustomer
router.post(
  "/createCustomer",
  authmw,
  permissionsMiddleware(true, true, false),
  async (req, res) => {
    try {
      console.log(req.body);
      let card = await cardsValidationService.createCardValidation(req.body);
      let normalCard = await normalizeCard(req.body, req.userData._id);
      const dataFromMongoose = await cardsServiceModel.createCard(normalCard);

      res.json({ msg: "ok" });
    } catch (err) {
      logErrorToFile(err, 400);
      res.status(400).json(err);
    }
  }
);
//edit
// owner
//http://localhost:8181/api/cards/:id
router.put(
  "/:id",
  authmw,
  permissionsMiddleware(false, false, true),
  async (req, res) => {
    try {
      await cardsValidationService.idUserValidation(req.params.id);
      await cardsValidationService.createCardValidation(req.body);
      await normalizeCard(req.body, req.userData._id);
      if (req.body.bizNumber) {
        throw new CustomError("you are not allowed to edit bizNumber");
      }
      if (req.body.password) {
        throw new CustomError("you are not allowed to edit password");
      }
      const cardFromDB = await cardsServiceModel.updateCard(
        req.params.id,
        req.body
      );
      res.json(cardFromDB);
    } catch (err) {
      if (err instanceof CustomError) logErrorToFile(err.msg, 400);
      else logErrorToFile(err, 400);
      res.status(400).json(err);
    }
  }
);
//edit biz num
// admin
//http://localhost:8181/api/cards/:id
router.put(
  "/biznum/:id",
  authmw,
  permissionsMiddleware(false, true, false),
  async (req, res) => {
    try {
      await cardsValidationService.idUserValidation(req.params.id);
      await cardsValidationService.createCardValidation(req.body);
      let businessNumbers = await cardsServiceModel.findBizNumber(
        req.body.bizNumber
      );
      if (!businessNumbers) {
        const cardFromDB = await cardsServiceModel.updateCard(
          req.params.id,
          req.body
        );
        res.json(cardFromDB);
      } else {
        throw new CustomError("The number is in use");
      }
    } catch (err) {
      if (err instanceof CustomError) logErrorToFile(err.msg, 400);
      else logErrorToFile(err, 400);
      res.status(400).json(err);
    }
  }
);
//http://localhost:8181/api/cards/:id
router.patch("/:id", authmw, async (req, res) => {
  try {
    await cardsValidationService.idUserValidation(req.params.id);
    let card = await cardsServiceModel.findOne({ _id: req.params.id });
    const cardLikes = card.likes.find((id) => id === req.userData._id);
    if (!cardLikes) {
      card.likes.push(req.userData._id);
      card = await card.save();
      return res.send(card);
    }
    const cardFiltered = card.likes.filter((id) => id !== req.userData._id);
    card.likes = cardFiltered;
    card = await card.save();
    return res.send(card);
  } catch (err) {
    logErrorToFile(err.msg, 500);
    return res.status(500).send(err);
  }
});
// admin or biz owner
//http://localhost:8181/api/cards/:id
router.delete(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, true),
  async (req, res) => {
    try {
      let num = 400;
      await cardsValidationService.idUserValidation(req.params.id);
      num = 500;
      const cardFromDB = await cardsServiceModel.deleteCard(req.params.id);
      if (cardFromDB) {
        res.json(cardFromDB);
      } else {
        res.json({ msg: "could not find the card" });
      }
    } catch (err) {
      logErrorToFile(err, 500);
      res.status(500).json(err);
    }
  }
);
module.exports = router;
