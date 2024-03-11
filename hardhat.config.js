require("@nomicfoundation/hardhat-toolbox");
const { KEY, NETWORK_URL } = require("./config");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    sepolia: {
      url: NETWORK_URL,
      accounts: [KEY],
    },
  },
};
