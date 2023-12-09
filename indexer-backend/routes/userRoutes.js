const express = require("express");
const router = express.Router();

const {
  getUser,
  addGuardianWallet,
  executeRecovery,
} = require("../controllers/userController");
const authGuardian = require("../middleware/authGuardian");
const authOwner = require("../middleware/authOwner");

router.route("/:walletAddress").get(getUser);
router
  .route("/:walletAddress/guardianWallet")
  .post(authGuardian, addGuardianWallet);
router.route("/recovery").put(authGuardian, executeRecovery);

module.exports = router;
