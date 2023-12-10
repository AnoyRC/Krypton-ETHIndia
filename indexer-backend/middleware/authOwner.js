const { ethers } = require('ethers');

const Krypton = require('../contracts/Krypton.js');
const { ChainConfig } = require('../utils/ChainConfig');

module.exports = async (req, res, next) => {
  try {
    const { walletAddress, kryptonAddress } = req.body;

    const chain = kryptonAddress.split(':')[0];
    const address = kryptonAddress.split(':')[1];

    const currentConfig = ChainConfig.find(
      (c) => c.chainId.toString() === chain
    );

    if (!currentConfig) {
      return res.status(400).json({ message: 'Invalid chain' });
    }

    const provider = new ethers.providers.JsonRpcProvider(currentConfig.rpc);
    const kryptonContract = new ethers.Contract(address, Krypton.abi, provider);

    const owner = await kryptonContract.owner();

    if (owner !== walletAddress) {
      return res.status(403).json({ message: 'Not an owner' });
    }

    req.chain = chain;
    req.kryptonAddress = address;
    req.walletAddress = walletAddress;

    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
};
