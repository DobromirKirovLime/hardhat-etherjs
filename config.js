const dotEnv = require("dotenv");
dotEnv.config({ path: __dirname + "/.env" });

const { KEY, WALLET_ADDRESS, CONTRACT_ADDRESS, NETWORK_URL } = process.env;

module.exports = { KEY, WALLET_ADDRESS, CONTRACT_ADDRESS, NETWORK_URL };
