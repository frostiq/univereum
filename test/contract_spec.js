var assert = require('assert');
var Embark = require('embark');
var EmbarkSpec = Embark.initTests();
var web3 = EmbarkSpec.web3;

describe("Unitoken", () => {
  before(function (done) {
    var contractsConfig = {
      "Unitoken": {
        args: [100000, "Unitoken", 2, "UNI", "0x0"]
      }
    };
    EmbarkSpec.deployAll(contractsConfig, done);
  });

  describe('#symbol()', () => {
    it('should return correct value', (done) => {
        console.log("deployed to: " + Unitoken.address)
        Unitoken.symbol(function(err, result) {
          assert.equal(result, "UNI");
          done();
        });
    });
  });
});
