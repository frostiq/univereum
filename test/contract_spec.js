var assert = require("assert");
var Embark = require("embark");
var EmbarkSpec = Embark.initTests();
var web3 = EmbarkSpec.web3;

describe("contracts", () => {
  before((done) => {
    var contractsConfig = {
      Unitoken: {
        gas: 4712388,
        args: [100000, "Unitoken", 2, "UNI", "0x0"]
      },
      Delegation: {
        gas: 4712388,
        args: ["$Unitoken", 75]
      },
      LiquidAssociation: {
        gas: 4712388,
        args: ["$Delegation", 1, 1]
      }
    }
    EmbarkSpec.deployAll(contractsConfig, done)
  })

  describe("Unitoken", () => {
    describe("#symbol()", () => {
      it("should return correct value", (done) =>
        Unitoken.symbol((err, res) => {
          assert.equal(res, "UNI")
          done(err)
        })
      )
    })
    describe("#balanceOf()", () => {
      it("should return positive balance", (done) => {
        web3.eth.getAccounts((err1, accs) => {
          Unitoken.balanceOf(accs[0], (err2, balance) => {
            assert.equal(balance, 100000)
            done(err1 || err2)
          })
        })
      })
    })
  })

  describe("LiquidAssociation", () => {
    describe("#newProposal()", () => {
      it("should increment numProposals", (done) => {
        web3.eth.getAccounts((err1, accs) => {
          LiquidAssociation.numProposals((err2, n1) => {
            LiquidAssociation.newProposal(accs[0], "test proposal", [], (err3) => {
              LiquidAssociation.numProposals((err4, n2) => {
                //assert.deepEqual(n2, n1.plus(1))
                done(err1 || err2 || err3 || err4)
              })
            })
          })
        })
      })
    })
  })
})