import { ethers } from "hardhat";

async function main() {

  const usElections = await ethers.deployContract("USElections");

  await usElections.waitForDeployment();

  const address = await usElections.getAddress();

  console.log(`USElection deployed to: ${address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
