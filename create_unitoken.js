let Web3 = require('web3');
let util = require('./util.js')
let contract = require('./bin/contracts/Unitoken.json')

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

let account = web3.eth.accounts[0];
util.createContract(web3, contract, account, [100000, 'Unitoken_v0.0.3', 2, 'UNI', account],
  function(err, myContract){
    if(!err) {
       // NOTE: The callback will fire twice!
       // Once the contract has the transactionHash property set and once its deployed on an address.

       // e.g. check tx hash on the first call (transaction send)
       if(!myContract.address) {
           console.log(myContract.transactionHash) // The hash of the transaction, which deploys the contract

       // check address on the second call (contract deployed)
       } else {
           console.log(myContract.address) // the contract address
           console.log('Total supply = ' + myContract.totalSupply())
       }

       // Note that the returned "myContractReturned" === "myContract",
       // so the returned "myContractReturned" object will also get the address set.
    }
    else{
      console.error(err)
    }
  }
)

