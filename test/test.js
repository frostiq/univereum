var assert = require('assert');
var Web3 = require('web3');
var web3 = new Web3();

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal(-1, [1,2,3].indexOf(4));
      console.log(web3)
    });
  });
});