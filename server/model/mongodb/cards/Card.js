const mongoose = require("mongoose");
const cardSchema = new mongoose.Schema({
  firstName: { type: String, maxLength: 256, trim: true, required: true },
  lastName: { type: String, maxLength: 256, trim: true, required: true },
  phone: {
    type: String,
    required: true,

    minLength: 9,
    maxLength: 14,
  },
  email: {
    type: String,
    require: true,
    minLength: 6,
    maxLength: 256,

    lowercase: true,
    trim: true,
    unique: true,
  },
  ReceptionDateAtTheOffice: {
    type: String,
    minLength: 6,
    maxLength: 14,
    required: true,
  },
  clubMember: { type: Boolean },
  BusinessDescription: {
    type: String,
    minLength: 2,
    maxLength: 1024,
    required: true,
  },

  country: { type: String, maxLength: 256 },
  city: { type: String, minLength: 2, maxLength: 256, required: true },
  street: { type: String, minLength: 2, maxLength: 256, required: true },
  houseNumber: { type: String, minLength: 1, maxLength: 256, required: true },
  zip: { type: Number, minLength: 0, maxLength: 99999999 },
  likes: [String],
  tasks: [String],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Card = mongoose.model("cards", cardSchema);

module.exports = Card;
