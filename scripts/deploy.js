async function main() {
  const Banking = await ethers.getContractFactory("Banking");
  const banking = await Banking.deploy();

  // // Wait until the contract is deployed
  // await banking.deployed();

  // console.log("Deployed to:", banking.address);

    // Wait until deployment is finished
  await banking.waitForDeployment();

  // Correct way to print address
  const address = await banking.getAddress();
  console.log("Financebanking deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
