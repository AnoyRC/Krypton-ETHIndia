const { Schema, model } = require("mongoose");

const KryptonModel = new Schema({
  walletAddress: {
    type: String,
    required: true,
    maxlength: 100,
    unique: true,
  },

  kryptonName: {
    type: String,
    required: true,
    maxlength: 100,
  },

  kryptonAddress: {
    type: String,
    required: true,
    maxlength: 100,
    unique: true,
  },
});

// Owner: Add Guardian, Update Guardian, UpdateName, create

module.exports = Krypton = model("Krypton", KryptonModel);
