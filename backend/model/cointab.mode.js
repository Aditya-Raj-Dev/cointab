const mongoose = require("mongoose");

const cointabString = { type: String, required: true };

const CointabSchema = mongoose.Schema({
  gender: cointabString,
  fname: cointabString,
  lname: cointabString,
  city: cointabString,
  state: cointabString,
  country: cointabString,
  email: cointabString,
  age: cointabString,
  image: cointabString,
});

const CointabModel = mongoose.model("coin", CointabSchema);

module.exports = { CointabModel };
