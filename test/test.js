let assert = require('assert');
let BigNumber = require('bignumber.js');
let util = require('../util.js')
let addresses = require('../addressBook.json')

describe('Unitoken', () => {
  describe('#symbol()', () => {
    it('should return correct value', () => {
      let c = util.getContractInstance('Unitoken')
      assert.equal(c.symbol(), 'UNI')
    });
  });
});

describe('LiquidDemocracy', () => {
  let c = util.getContractInstance('LiquidDemocracy')
  describe('#delegatedPercent()', () =>{ 
    it('should return correct value', () => {
      assert.deepEqual(c.delegatedPercent(), new BigNumber(25))
    });
  });
  
  // describe('#vote()', () => {
  //   it('should increment numberOfVotes', () => {
  //     let n1 = c.numberOfVotes()
  //     let txhash = c.vote(util.accounts[3], util.txparams)
  //     util.waitForAppliance(txhash)
  //     let n2 = c.numberOfVotes()
  //     assert.deepEqual(n2, n1.plus(1))
  //   });
  // });
});

describe('Association', () => {
  let c = util.getContractInstance('Association')
  
  describe('#newProposal()', () => {
    it('should increment numProposals', () => {
      let n1 = c.numProposals()
      let txhash = c.newProposal(util.accounts[0], 0, "test proposal", [], util.txparams)
      util.waitForAppliance(txhash)
      let n2 = c.numProposals()
      assert.deepEqual(n2, n1.plus(1))
    });
  });
});