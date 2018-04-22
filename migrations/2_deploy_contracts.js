var Unitoken = artifacts.require("Unitoken")
var Delegation = artifacts.require("Delegation")
var LiquidAssociation = artifacts.require("LiquidAssociation")

module.exports = function(deployer) {
  deployer.deploy(Unitoken, 1000, "Unitoken_v0.0.3", 0, "UNI", "0x0")
  .then(() => deployer.deploy(Delegation, Unitoken.address, 75))
  .then(() => deployer.deploy(LiquidAssociation, Delegation.address, 1, 1))
  
};
