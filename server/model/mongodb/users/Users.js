const mongoose = require("mongoose");
const Name = require("./Name");
const Address = require("./Address");

const schema = new mongoose.Schema({
  name: Name,
  phone: {
    type: String,
    required: true,
    match: RegExp(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/),
  },
  email: {
    type: String,
    require: true,
    match: RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/),
    lowercase: true,
    trim: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    match: RegExp(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    ),
  },

  address: Address,
  isAdmin: { type: Boolean, default: false },
  isBusiness: { type: Boolean, default: false, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  timeStamps: { type: Number, default: 0, required: true },
  blockedUntil: { type: Number, default: 0, required: true },
  triesTimes: { type: [Number], default: [0, 0], required: true },
});
const User = mongoose.model("users", schema);

module.exports = User;
