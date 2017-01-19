var assert = require('assert');
var Web3 = require('web3');
var contract = require('./bin/Unitoken.json')

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

let account = "0x05c42f93fab54b9bdf41b3a7ba2b2ef9061d27b1"
let bytecode = '0x' + contract.bytecode;
let gasEstimate = web3.eth.estimateGas({data: bytecode});
let Unitoken = web3.eth.contract(JSON.parse(contract.abi));

var myContractInstance = Unitoken.new(100000, 'Unitoken_v0.0.3', 2, 'UNI',
  { data: bytecode, gas: gasEstimate, from: account},
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
       }

       // Note that the returned "myContractReturned" === "myContract",
       // so the returned "myContractReturned" object will also get the address set.
    }
    else{
      console.err(err)
    }
  });