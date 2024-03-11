const hre = require("hardhat");
const USElection = require("../artifacts/contracts/USElections.sol/USElections.json");
const { KEY, WALLET_ADDRESS, CONTRACT_ADDRESS } = require("../config");

const run = async function () {
  const provider = new hre.ethers.InfuraProvider("sepolia");

  const wallet = new hre.ethers.Wallet(KEY, provider);
  const balance = await wallet.provider.getBalance(WALLET_ADDRESS);

  console.log(
    "\nBalance of the Metamask wallet, formatted:\n",
    hre.ethers.formatUnits(balance),
    hre.ethers.formatEther(balance),
    balance.toString()
  );

  const electionContract = new hre.ethers.Contract(
    CONTRACT_ADDRESS,
    USElection.abi,
    wallet
  );
  console.log("\nSmart Contarct:\n", electionContract);

  const hasEnded = await electionContract.electionEnded();
  console.log("\nIs the election ended: ", hasEnded);

  const state = "California";

  const hasResultsForState = await electionContract.resultSubmitted(state);
  console.log(`\nResults for ${state} submitted: `, hasResultsForState);

  const transactionForState = await electionContract.submitStateResult([
    state,
    259,
    99,
    24,
  ]);
  const transactionReceipt = await transactionForState.wait();
  if (transactionReceipt.status !== 1)
    return console.log("The transaction was not succsessfull!");

  const hasResultsForStateNew = await electionContract.resultSubmitted(state);
  console.log(`\nResults for ${state} submitted: `, hasResultsForStateNew);

  const currentLeader = await electionContract.currentLeader();
  console.log("\n The current leaader is: ", currentLeader.toString());
};

run();
