let Web3 = require('web3')
let sleep = require('sleep');
let addresses = require('./addressBook.json')

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
}

function getContractType(contractName){
  let contract = require(`./bin/contracts/${contractName}.json`)
  let bytecode = '0x' + contract.bytecode
  let contractType = web3.eth.contract(JSON.parse(contract.abi))
  contractType.bytecode = bytecode

  return contractType
}

function createCallback(err, myContract){
  if(!err) {
    if(!myContract.address) {
       console.log(myContract.transactionHash)
    } else {
       console.log(myContract.address) // the contract address
    }
  }
  else{
    console.error(err)
  }
}

exports.createContract = function(contractName, params){
  let contractType = getContractType(contractName)
  let gasEstimate = web3.eth.estimateGas({data: contractType.bytecode})
  let creatorAccount = web3.eth.accounts[0]
  params = params.concat(
    { data: contractType.bytecode, gas: 4712388, from: creatorAccount},
    createCallback)
    
  let instance = contractType.new.apply(contractType, params)

  return instance
}

exports.getContractInstance = function(contractName) {
  let contractType = getContractType(contractName)
  let contractInstance = contractType.at(addresses[contractName])

  return contractInstance
}

exports.accounts = web3.eth.accounts

exports.txparams = function(account = web3.eth.accounts[0]) {
  return {from : account, gas : 4712388}
}

exports.waitForAppliance = function(txhash, callback){
  let filter = web3.eth.filter('latest')
  filter.watch(function(e, result){
    if(!e){
      web3.eth.getTransaction(txhash, (e, tx) => {
        if (!e && tx.blockNumber != null){
          filter.stopWatching()
          console.log('tx block number: ' + tx.blockNumber)
          callback()
        }
      })
    }
    else{
      console.error(e)
    }
  });
}