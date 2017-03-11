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

describe('LiquidAssociation', () => {
  let c = util.getContractInstance('LiquidAssociation')
  
  describe('#newProposal()', () => {
    it('should increment numProposals', (done) => {
      let n1 = c.numProposals()
      let txhash = c.newProposal(util.accounts[0], "test proposal", [], util.txparams())
      util.waitForAppliance(txhash, () => {
        let n2 = c.numProposals()
        assert.deepEqual(n2, n1.plus(1))
        done()
      })
    }).timeout(60000)
  });
});