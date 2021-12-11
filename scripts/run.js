const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const nemoCointFactory = await hre.ethers.getContractFactory("NemoCoin");
  const nemoContract = await nemoCointFactory.deploy(10000);
  await nemoContract.deployed();

  console.log("Contract deployed to:", nemoContract.address);

  let txn = await nemoContract.getBalance();
  console.log(txn.toNumber());

  txn = await nemoContract.transfer(randomPerson.address, 500);
  await txn.wait();

  txn = await nemoContract.getBalance();
  console.log("Current balance", txn.toNumber());

  txn = await nemoContract.connect(randomPerson).getBalance();
  console.log("randomPerson balance", txn.toNumber());
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
