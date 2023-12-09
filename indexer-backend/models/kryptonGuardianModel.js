const mongoose = require("mongoose");

const KryptonGuardianSchema = new mongoose.Schema({
  kryptonAddress: {
    type: String,
    required: true,
  },
  guardianName: { type: String, required: true },
  guardianAddress: { type: String, required: true },
});

// Owner: Create Guardian, UpdateName, UpdateGuardian

module.exports = KryptonGuardian = mongoose.model(
  "KryptonGuardian",
  KryptonGuardianSchema
);
