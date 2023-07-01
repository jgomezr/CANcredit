var express = require('express');
var route = express.Router();


// try to get parameters to send data
route.get('/app', (req, res)=> {
  const hre = require("hardhat");
  var amountphp = Math.round(req.query.amountphp);
  var amountCusd = hre.ethers.utils.parseUnits(req.query.amountCusd,18);
  var reward = hre.ethers.utils.parseUnits(req.query.reward,18);
  var agent = req.query.agent;
  var mfi = req.query.mfi;
  var colateral = req.query.colateral;
  var start = req.query.start;
  var end = req.query.end;
  var fee = hre.ethers.utils.parseUnits("0.015",18);
    
  async function main() {

    const contractAmount = (parseInt(amountCusd)+parseInt(reward)+parseInt(fee)).toString();

    const Wave3 = await hre.ethers.getContractFactory("celoWave3");

    try{
      const wave3 = await Wave3.deploy(amountphp,amountCusd,reward,agent,mfi,colateral,start,end);
      await wave3.deployed();
      console.log( `Deployed to ${wave3.address}`);
      res.send({'result': wave3.address});
    }catch (error) {
      console.error("Error deploying contract:", error);
      res.send({'result': false});
    }
    
    try{
      const CUSD_ADDRESS = "0x765de816845861e75a25fca122bb6898b8b1282a";
      const cusd = await hre.ethers.getContractAt("IERC20", CUSD_ADDRESS);
      await cusd.approve(wave3.address, contractAmount);
      await wave3.receiveCusd(contractAmount);
    }catch (error) {
      console.error("Error adding founds to contract:", error);
      res.send({'result': false});
    }
  }
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
    
});

module.exports = route;