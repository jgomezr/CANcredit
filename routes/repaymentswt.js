var express = require('express');
var route = express.Router();


// try to get parameters to send data
route.get('/repaywt', (req, res)=> {
  const hre = require("hardhat");
  var amountphp = Math.round(req.query.amountphp).toString();
  var agent = req.query.agent;
  var date = req.query.date;
  var contract = req.query.contract;

  async function main () {
    const Wave3 = await hre.ethers.getContractFactory("celoWave3");
    const wave3 = await Wave3.attach(contract);

    try{
      await wave3.loanRepaymentswt(agent, amountphp, date);
      console.log(`Repayd contract: ${await wave3.address}`);
      res.send({'result': wave3.address});
    }catch (error) {
      console.error("Error during repayment:", error);
      res.send({'result': false});
    }
  }
  
    main().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });
});

module.exports = route;