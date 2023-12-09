const mongoose = require("mongoose");

const KryptonGuardian = require("../models/kryptonGuardianModel");

const createGuardian = async (req, res) => {
  const kryptonAddress = req.kryptonAddress;
  const newGuardian = new KryptonGuardian({
    kryptonAddress,
    name: req.body.guardianName,
    address: req.body.guardianAddress,
  });

  try {
    const savedGuardian = await newGuardian.save();

    res.json(savedGuardian);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getGuardians = async (req, res) => {
  try {
    const kryptonAddress = req.params.kryptonAddress;
    const guardians = await KryptonGuardian.find({ kryptonAddress });

    res.json(guardians);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createGuardian,
  getGuardians,
};
