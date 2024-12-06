// import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@shardlabs/starknet-hardhat-plugin";

// const config: HardhatUserConfig = {
//   solidity: "0.8.28",
// };

module.exports = {
  starknet: {
      dockerizedVersion: "0.10.3",
      network: "alpha-goerli"
  },
  networks: {
  }
};

// export default config;
