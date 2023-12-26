const mongoose = require("mongoose");
const Image = require("./Image");
const Address = require("./Address");
const {
  URL,
  DEFAULT_STRING_SCHEMA_REQUIRED,
} = require("./helpers/mongooseValidation");

const cardSchema = new mongoose.Schema({
  // title: DEFAULT_STRING_SCHEMA_REQUIRED,
  // subTitle: DEFAULT_STRING_SCHEMA_REQUIRED,
  // description: { ...DEFAULT_STRING_SCHEMA_REQUIRED, maxLength: 1024 },
  // phone: {
  //   type: String,
  //   required: true,
  //   match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
  // },
  // email: {
  //   type: String,
  //   required: true,
  //   match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
  //   lowercase: true,
  //   trim: true,
  // },
  // web: URL,
  // image: Image,
  // address: Address,
  // bizNumber: {
  //   type: Number,
  //   minLength: 7,
  //   maxLength: 7,
  //   required: true,
  //   trim: true,
  // },
  // likes: [String],
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  // user_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  // },
  firstName: { type: String, maxLength: 256, trim: true, required: true },
  lastName: { type: String, maxLength: 256, trim: true, required: true },
  phone: {
    type: String,
    required: true,
    //match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
    minLength: 9,
    maxLength: 14,
  },
  email: {
    type: String,
    require: true,
    minLength: 6,
    maxLength: 256,
    //match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
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
  zip: { type: Number, minLength: 1, maxLength: 99999999 },
  likes: [String],
  tasks: [String],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Card = mongoose.model("cards", cardSchema);

module.exports = Card;
