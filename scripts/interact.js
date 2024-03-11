const hre = require("hardhat");
const USElection = require("../artifacts/contracts/USElections.sol/USElections.json");

const run = async function () {
  const provider = new hre.ethers.JsonRpcProvider("http://localhost:8545");
  const latestBlock = await provider.getBlock("latest");
  console.log("\nLatest block hash:\n", latestBlock.hash);

  const wallet = new hre.ethers.Wallet(
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    provider
  );
  const balance = await wallet.provider.getBalance(
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  );
  console.log(
    "\nBalance of the first hardhat wallet, formatted:\n",
    hre.ethers.formatUnits(balance),
    hre.ethers.formatEther(balance),
    balance.toString()
  );

  const electionContract = new hre.ethers.Contract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    USElection.abi,
    wallet
  );
  console.log("\nSmart Contarct:\n", electionContract);

  const hasEnded = await electionContract.electionEnded();
  console.log("\nIs the election ended: ", hasEnded);

  const state = "New Jersey";

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
