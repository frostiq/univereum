let assert = require('assert');
let BigNumber = require('bignumber.js');
let util = require('../util.js')
let addresses = require('../addressBook.json')

describe('Unitoken', () => {
  let c = util.getContractInstance('Unitoken')
  describe('#symbol()', () => {
    it('should return correct value', () => {
      assert.equal(c.symbol(), 'UNI')
    });
  });
  describe('#balanceOf()', () => {
    it('should return positive balance', () => {
      let balance = c.balanceOf(util.accounts[0])
      assert(balance.gt(0))
    });
  });
});

describe('LiquidAssociation', () => {
  let c = util.getContractInstance('LiquidAssociation')
  
  describe('#newProposal()', () => {
    it('should increment numProposals', (done) => {
      let n1 = c.numProposals()
      let txhash = c.newProposal(util.accounts[0], "test proposal", [], util.txparams(util.accounts[1]))
      util.waitForAppliance(txhash, () => {
        let n2 = c.numProposals()
        assert.deepEqual(n2, n1.plus(1))
        done()
      })
    }).timeout(60000)
  });
});