const hre = require("hardhat");

async function main() {
  const USElection = await hre.ethers.deployContract("USElections");
  await USElection.waitForDeployment();
  const address = await USElection.getAddress();
  console.log("USElections deployed to:", address);

  const Library = await hre.ethers.deployContract("Library");
  await Library.waitForDeployment();
  const address2 = await Library.getAddress();
  console.log("Library deployed to:", address2);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
