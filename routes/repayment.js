var express = require('express');
var route = express.Router();


// try to get parameters to send data
route.get('/repay', (req, res)=> {
  const hre = require("hardhat");
  var amountphp = Math.round(req.query.amountphp).toString();
  var agent = req.query.agent;
  var date = req.query.date;
  var contract = req.query.contract;

  async function main () {
    const Wave3 = await hre.ethers.getContractFactory("celoWave3");
    const wave3 = await Wave3.attach(contract);
    await wave3.loanRepayments(agent, amountphp, date);
    console.log(
        `Remaining php ${await wave3.remainingPhp()}`
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