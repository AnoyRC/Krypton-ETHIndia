const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  walletAddress: {
    type: String,
    required: true,
    maxlength: 100,
    unique: true,
  },

  guardianWallet: [
    {
      type: String,
      maxlength: 100,
    },
  ],
});

// Guardian: Create User, Add Guardian Wallet, Get User

module.exports = User = model("User", UserSchema);
