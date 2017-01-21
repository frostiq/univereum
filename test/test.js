var assert = require('assert');
var Web3 = require('web3');
var contract = require('../bin/Unitoken.json')
var should = require('should');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
let account = "0x05c42f93fab54b9bdf41b3a7ba2b2ef9061d27b1"
let contractAddress = "0x52b0a0bcc97f5defc75aa03d22d7ca3e9e5aa0de"
let bytecode = '0x' + contract.bytecode;
let gasEstimate = web3.eth.estimateGas({data: bytecode});
let Unitoken = web3.eth.contract(JSON.parse(contract.abi));

describe('Unitoken', () => {
  describe('#totalSupply()', () => {
    it('should return correct value', () => {
      var c = Unitoken.at(contractAddress)
      c.symbol().should.be.equal('UNI')
      c.totalSupply().should.be.above(0)
    });
  });
});