let util = require('./util.js')
let addresses = require('./addressBook.json')
web3.eth.defaultAccount = util.accounts[0]
let t = util.getContractInstance('Unitoken')
let d = util.getContractInstance('Delegation')