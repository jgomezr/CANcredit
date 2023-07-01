require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config({path: '.env'});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.15",

  defaultNetwork: "celo",
  networks: {
    celo: {
      url: "https://forno.celo.org",
      gas: 3000000,
      gasPrice: 8000000000,
      defaultFeeCurrency: "cusd",
      accounts: {
        mnemonic: process.env.MNEMONIC,
        path: "m/44'/52752'/0'/0", 
      },
      chainId: 42220,
      contractAddress:{
        cUSD: "0x765de816845861e75a25fca122bb6898b8b1282a"
      },
    },
  },
};
