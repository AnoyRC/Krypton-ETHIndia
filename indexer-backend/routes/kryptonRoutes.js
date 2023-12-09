const express = require("express");
const router = express.Router();

const kryptonController = require("../controllers/kryptonController");
const authOwner = require("../middleware/authOwner");

router.post("/create", authOwner, kryptonController.createKrypton);

router.put("/addGuardian", authOwner, kryptonController.addGuardian);
router.put("/updateName", authOwner, kryptonController.updateName);
router.put("/updateGuardian", authOwner, kryptonController.updateGuardian);
router.get("/getGuardians/:walletAddress", kryptonController.getKryptons);

module.exports = router;
