const express = require("express");
const router = express.Router();

const {
  createGuardian,
  getGuardians,
} = require("../controllers/kryptonGuardianController");
const authOwner = require("../middleware/authOwner");

router.route("/").post(authOwner, createGuardian);
router.route("/:kryptonAddress").get(getGuardians);

module.exports = router;
