const hre = require("hardhat");

async function main() {
  const USElection = await hre.ethers.deployContract("USElections");
  await USElection.waitForDeployment();
  const address = await USElection.getAddress();
  console.log("USElections deployed to:", address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
