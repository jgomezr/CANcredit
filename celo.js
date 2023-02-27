const hre = require("hardhat");
    
async function main() {

    var amountphp = Math.round("1");
    var amountCusd = hre.ethers.utils.parseUnits("2",18);
    var reward = hre.ethers.utils.parseUnits("0.18",18);
    var agent = "0x42d16bdc0618451b42ebf97c3d31cd0b07b6c97d";
    var mfi = "0x42d16bdc0618451b42ebf97c3d31cd0b07b6c97d";
    var colateral = "0x42d16bdc0618451b42ebf97c3d31cd0b07b6c97d";
    var start = 1670969245342;
    var end = 1670969245342;
    var fee = hre.ethers.utils.parseUnits("0.09",18);

    const contractAmount = (parseInt(amountCusd)+parseInt(reward)+parseInt(fee)).toString();
    const contractAmount2 = (amountCusd+reward).toString();

    const Wave3 = await hre.ethers.getContractFactory("celoWave3");
    const wave3 = await Wave3.deploy(amountphp,amountCusd,reward,agent,mfi,colateral,start,end, { value: contractAmount });

    await wave3.deployed();

    console.log(
      `Deployed to ${wave3.address}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
 });