import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import 'hardhat-deploy';
import "@nomiclabs/hardhat-etherscan";
import "solidity-coverage"
import '@openzeppelin/hardhat-upgrades';

import { ethers } from "ethers";

require("dotenv").config();

const INFURA_PROJECT_ID = process.env.INFURA_PROJECT_ID || "";
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "";
const MATICVIGIL_APP_ID = process.env.MATICVIGIL_APP_ID || "";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";

//---------------------==
const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    // localhost: {
    //   url: "http://127.0.0.1:8545"
    // },
    polygonmumbai: {
      url: `https://rpc-mumbai.maticvigil.com/v1/${MATICVIGIL_APP_ID}`,
      chainId: 80001,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`],
      gasPrice: ethers.utils.parseUnits("10", "gwei").toNumber(),
      gas: 15e6,
      gasMultiplier: 10,
      allowUnlimitedContractSize: true,
      blockGasLimit: 0x1fffffffffffff,
    },
    polygonmainnet: {
      url: `https://polygon-mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
      chainId: 137,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`],
      gasPrice: ethers.utils.parseUnits("150", "gwei").toNumber(),
      gasMultiplier: 10,
      timeout: 12000000,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`],
      gasPrice: ethers.utils.parseUnits("200", "gwei").toNumber(),
      gas: 7e6,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`],
      gasPrice: ethers.utils.parseUnits("20", "gwei").toNumber(),
      gas: 25e6,
      gasMultiplier: 10,
      allowUnlimitedContractSize: true,
      blockGasLimit: 0x1fffffffffffff,
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY}`],
      gasPrice: ethers.utils.parseUnits("20", "gwei").toNumber(),
      gas: 25e6,
      gasMultiplier: 10,
      allowUnlimitedContractSize: true,
      blockGasLimit: 0x1fffffffffffff,
    },
    ganache: {
      url: "http://127.0.0.1:8545",
    },
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          },
        }
      },
    ],
    overrides: {
    },
  },
  namedAccounts: {
    deployer: 0,
    user1: 1,
  },
  mocha: {
    timeout: 2000000,
  },
};

export default config;