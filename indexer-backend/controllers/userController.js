const mongoose = require('mongoose');

const User = require('../models/userModel');
const Krypton = require('../models/kryptonModel');

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({
      walletAddress: req.params.walletAddress,
    });

    if (!user) {
      const newUser = new User({
        walletAddress: req.params.walletAddress,
        guardianWallet: [],
      });

      await newUser.save();

      return res.json(newUser);
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addGuardianWallet = async (req, res) => {
  try {
    const user = await User.findOne({ wallet: req.params.walletAddress });

    user.guardianWallet.push(req.body.guardianWallet);

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const executeRecovery = async (req, res) => {
  try {
    const kryptonAddress = req.kryptonAddress;

    const krypton = await Krypton.findOne({ kryptonAddress });

    if (!krypton) {
      return res.status(404).json({ message: 'Krypton not found' });
    }

    const proposedOwner = req.body.proposedOwner;

    if (!proposedOwner) {
      return res.status(400).json({ message: 'Proposed owner not given' });
    }

    krypton.walletAddress = proposedOwner;

    await krypton.save();

    res.json(krypton);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUser,
  addGuardianWallet,
  executeRecovery,
};
