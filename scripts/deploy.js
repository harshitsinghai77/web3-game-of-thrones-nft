const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("ShadowNFT");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // Call the function.
  let txn = await nftContract.makeAnEpicNFT(
    "data:application/json;base64,eyJkZXNjcmlwdGlvbiI6IkFuIE5GVCBmcm9tIHRoZSBoaWdobHkgYWNjbGFpbWVkIGdhbWUgb2YgdGhyb25lcyBjb2xsZWN0aW9uIiwicXVvdGUiOiJNeSBzd29yZCBpcyB5b3VycywgaW4gdmljdG9yeSBhbmQgZGVmZWF0LCBmcm9tIHRoaXMgZGF5IHVudGlsIG15IGxhc3QgZGF5LiIsInF1b3RlQnkiOiJUaGVvbiBHcmV5am95IiwiaG91c2UiOiJIb3VzZSBHcmV5am95IG9mIFB5a2UiLCJpbWFnZSI6ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QnBaRDBpYlhsemRtY2lJSGh0Ykc1elBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5SWdjSEpsYzJWeWRtVkJjM0JsWTNSU1lYUnBiejBpZUUxcGJsbE5hVzRnYldWbGRDSWdkbWxsZDBKdmVEMGlNQ0F3SURNMU1DQXpOVEFpSUdacGJHdzlJbmRvYVhSbElpQmpiR0Z6Y3owaWMzWm5MWFJsZUhRaVBqeHlaV04wSUhkcFpIUm9QU0l4TURBbElpQm9aV2xuYUhROUlqY3dKU0lnWm1sc2JEMGlZbXhoWTJzaUx6NDhkR1Y0ZENCNFBTSTFNQ1VpSUhrOUlqSTFKU0lnWTJ4aGMzTTlJbUpoYzJVaUlIUmxlSFF0WVc1amFHOXlQU0p0YVdSa2JHVWlQangwYzNCaGJpQjRQU0kxTUNVaUlHUjVQU0l4TGpKbGJTSStUWGtnYzNkdmNtUWdhWE1nZVc5MWNuTXNJR2x1SUhacFkzUnZjbmtnWVc1a0lHUmxabVZoZEN3OEwzUnpjR0Z1UGp4MGMzQmhiaUI0UFNJMU1DVWlJR1I1UFNJeExqSmxiU0krWm5KdmJTQjBhR2x6SUdSaGVTQjFiblJwYkNCdGVTQnNZWE4wSUdSaGVTNDhMM1J6Y0dGdVBqeDBjM0JoYmlCNFBTSTFNQ1VpSUdSNVBTSXhMakpsYlNJK0lEd3ZkSE53WVc0K1BIUnpjR0Z1SUhnOUlqY3dKU0lnWkhrOUlqRXVNbVZ0SWo0dElGUm9aVzl1SUVkeVpYbHFiM2s4TDNSemNHRnVQand2ZEdWNGRENDhMM04yWno0PSJ9"
  );
  // Wait for it to be mined.
  await txn.wait();
  console.log("Minted NFT #1");
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
