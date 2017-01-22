var should = require('should');

describe('Unitoken', () => {
  describe('#totalSupply()', () => {
    it('should return correct value', () => {
      var c = Unitoken.at(addresses.Unitoken)
      c.symbol().should.be.equal('UNI')
      c.totalSupply().should.be.above(0)
    });
  });
});

describe('LiquidDemocracy', () => {
  describe('#delegatedPercent()', () =>{ 
    it('should return correct value', () => {
      var c = LiquidDemocracy.at(addresses.LiquidDemocracy)
      c.delegatedPercent().should.be.equal(75)
    });
  });
});