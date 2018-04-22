module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 4600000
    },
    kovan: {
      host: "localhost",
      port: 8545,
      network_id: 42,
      gasPrice: 1000000000,
      from: ""
    }
  },

  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
