let Web3 = require('web3')
let fs = require('fs');
let addresses = require('./addressBook.json')

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider)
} else {
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))
}

exports.createContract = function(contractName, params){
  let contractType = getContractType(contractName)
  let creatorAccount = web3.eth.accounts[0]
  params = params.concat(
    { data: contractType.bytecode, gas: 4712388, from: creatorAccount},
    creationCallback(contractName))
    
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

function getContractType(contractName){
  let contract = require(`./bin/contracts/${contractName}.json`)
  let bytecode = '0x' + contract.bytecode
  let contractType = web3.eth.contract(JSON.parse(contract.abi))
  contractType.bytecode = bytecode

  return contractType
}

let creationCallback = (contractName) => (err, myContract) => {
  if(!err) {
    if(!myContract.address) {
       console.log('Contract created in tx: ' + myContract.transactionHash)
    } else {
       console.log('Contract address: ' + myContract.address)
       addresses[contractName] = myContract.address
       fs.writeFile('./addressBook.json', JSON.stringify(addresses,  null, 2), function (err) {
         if (err) console.error(err)
       })
    }
  }
  else{
    console.error(err)
  }
}