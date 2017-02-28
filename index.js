let util = require('./util.js')
let addresses = require('./addressBook.json')
let accs = util.accounts
web3.eth.defaultAccount = accs[0]
let t = util.getContractInstance('Unitoken')
let d = util.getContractInstance('Delegation')
let a = util.getContractInstance('LiquidAssociation')