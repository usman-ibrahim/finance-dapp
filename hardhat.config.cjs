// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.28",
// };
require("@nomicfoundation/hardhat-chai-matchers"); // if not already

require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  // solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};

