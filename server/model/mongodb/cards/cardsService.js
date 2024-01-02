const Card = require("./Card");
const Tasks = require("../tasks/Tasks");
const createCard = (cardToSave) => {
  let card = new Card(cardToSave);
  return card.save();
};

const getAllCards = () => {
  return Card.find();
};

const getCardById = (id) => {
  return Card.findById(id);
};

const getCardByBizNumber = (bizNumber) => {
  return Card.findOne({ bizNumber }, { bizNumber: 1, _id: 0 });
};

const updateCard = (id, cardToUpdate) => {
  return Card.findByIdAndUpdate(id, cardToUpdate, {
    new: true,
  });
};

const deleteCard = async (id) => {
  const card = Card.findOne(id);
  if (!card) {
    return null;
  }

  await Tasks.deleteMany({ customerID: id });

  return Card.findByIdAndDelete(id);
};

const findOne = (id) => {
  return Card.findOne(id);
};

const findBizNumber = (bizNumber) => {
  return Card.findOne({ bizNumber }, { bizNumber: 1, _id: 0 });
};

const findMylikescards = (userID) => {
  return Card.find({ likes: userID });
};
const getCustomerNameById = (_id) => {
  return Card.findOne({ _id }, { firstName: 1, lastName: 1, _id: 0 });
};
module.exports = {
  createCard,
  getAllCards,
  getCardById,
  getCardByBizNumber,
  updateCard,
  deleteCard,
  findOne,
  findBizNumber,
  findMylikescards,
  getCustomerNameById,
};
