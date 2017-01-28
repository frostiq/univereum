let Web3 = require('web3')
let addresses = require('./addressBook.json')

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
}

function getContractType(contractName){
  let contract = require(`./bin/contracts/${contractName}.json`)
  let bytecode = '0x' + contract.bytecode
  let contractType = web3.eth.contract(JSON.parse(contract.abi))
  contractType.bytecode = bytecode

  return contractType
}

exports.createContract = function(contractName, params, callback){
  let contractType = getContractType(contractName)
  let gasEstimate = web3.eth.estimateGas({data: contractType.bytecode})
  let creatorAccount = web3.eth.accounts[0]
  params = params.concat(
    { data: contractType.bytecode, gas: gasEstimate * 2, from: creatorAccount},
    callback)
    
  let instance = contractType.new.apply(contractType, params)

  return instance
}

exports.getContractInstance = function(contractName) {
  let contractType = getContractType(contractName)
  let contractInstance = contractType.at(addresses[contractName])

  return contractInstance
}

exports.accounts = web3.eth.accounts