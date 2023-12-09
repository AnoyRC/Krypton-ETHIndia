const Krypton = require("../models/kryptonModel");
const KryptonGuardian = require("../models/kryptonGuardianModel");

const createKrypton = async (req, res) => {
  const walletAddress = req.walletAddress;
  const kryptonAddress = req.kryptonAddress;

  const newKrypton = new Krypton({
    kryptonName: req.body.kryptonName,
    walletAddress,
    kryptonAddress,
  });

  try {
    const savedKrypton = await newKrypton.save();

    res.json(savedKrypton);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addGuardian = async (req, res) => {
  try {
    const kryptonAddress = req.kryptonAddress;
    const guardianName = req.body.guardianName;
    const guardianAddress = req.body.guardianAddress;

    const newGuardian = new KryptonGuardian({
      guardianName,
      kryptonAddress,
      guardianAddress,
    });

    const savedGuardian = await newGuardian.save();

    return res.json(savedGuardian);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateName = async (req, res) => {
  try {
    const walletAddress = req.walletAddress;
    const krypton = await Krypton.findOne({ kryptonAddress:req.kryptonAddress });
    const name = req.body.name;

    if (!krypton) return res.status(404).json({ message: "Krypton not found" });

    krypton.kryptonName = name;

    await krypton.save();

    res.json(krypton);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateGuardian = async (req, res) => {
  try {
    const guardian = await KryptonGuardian.findOne({
      kryptonAddress: req.kryptonAddress,
      guardianAddress: req.body.guardianAddress,
    });

    if (!guardian)
      return res.status(404).json({ message: "Guardian not found" });

    const newGuardian = req.body.newGuardian;

    guardian.address = newGuardian.address;

    await guardian.save();

    res.json(guardian);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getKryptons = async (req, res) => {
  try {
    const kryptons = await Krypton.find({
      walletAddress: req.params.walletAddress,
    });

    res.json(kryptons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createKrypton,
  addGuardian,
  updateName,
  updateGuardian,
  getKryptons,
};
