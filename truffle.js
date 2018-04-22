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
      from: "0x001D51cDC8f4B378e136642DdB95Dfc4fF6a4B72"
    }
  },

  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
