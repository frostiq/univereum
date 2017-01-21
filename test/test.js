var should = require('should');
var Web3 = require('web3');
var contract = require('../bin/contracts/Unitoken.json')

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
let account = web3.eth.accounts[0];
let contractAddress = '0xe21eb3137a8f8e7edaf9625af11cda5a87fb9552'
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