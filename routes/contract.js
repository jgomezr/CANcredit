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
  var fee = hre.ethers.utils.parseUnits("1",18);
    
  async function main() {

    const contractAmount = (parseInt(amountCusd)+parseInt(reward)+parseInt(fee)).toString();

    const Wave3 = await hre.ethers.getContractFactory("celoWave3");
    const wave3 = await Wave3.deploy(amountphp,amountCusd,reward,agent,mfi,colateral,start,end, { value: contractAmount });

    await wave3.deployed();

    console.log(
      `Deployed to ${wave3.address}`
    );
    res.send({
      'result': wave3.address
    });
  }
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
    
});

module.exports = route;