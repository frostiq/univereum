let assert = require('assert');
let util = require('../util.js')
let BigNumber = require('bignumber.js');

describe('Unitoken', () => {
  describe('#symbol()', () => {
    it('should return correct value', () => {
      let c = util.getContractInstance('Unitoken')
      assert.equal(c.symbol(), 'UNI')
    });
  });
});

describe('LiquidDemocracy', () => {
  describe('#delegatedPercent()', () =>{ 
    it('should return correct value', () => {
      let c = util.getContractInstance('LiquidDemocracy')
      assert.deepEqual(c.delegatedPercent(), new BigNumber(25))
    });
  });
});