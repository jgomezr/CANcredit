var express = require('express');
var route = express.Router();


// try to get parameters to send data
route.get('/default', (req, res)=> {
  const hre = require("hardhat");
  var colateral = req.query.colateral;
  var mfi = req.query.mfi;
  var date = req.query.date;
  var contract = req.query.contract;

  async function main () {
    const Wave3 = await hre.ethers.getContractFactory("celoWave3");
    const wave3 = await Wave3.attach(contract);
    await wave3.loanRepayments(date, mfi, colateral);
    console.log(
        `Deployed to ${wave3.status()}`
      );
      res.send({
        'result': wave3.address
      });
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });

});

module.exports = route;