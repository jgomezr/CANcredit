var express = require('express');
var route = express.Router();

// try to get parameters to send data
route.get('/df', (req, res)=> {
  const hre = require("hardhat");

  var date = req.query.date;
  var mfi = req.query.mfi;
  var colateral = req.query.colateral;
  var contract = req.query.contract;
 
  async function main () {
    const Wave3 = await hre.ethers.getContractFactory("celoWave3");
    const wave3 = await Wave3.attach(contract);

    try{
      await wave3.loanDefault(date, mfi, colateral);
      console.log( `Default contract: ${await wave3.address}`);
      res.send({ 'result': wave3.address});
    }catch (error) {
      console.error("Error defaulting contract:", error);
      res.send({'result': false});
    }
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

});

module.exports = route;