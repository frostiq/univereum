let util = require('../util.js')
let addresses = require('../addressBook.json')

let d = addresses.Delegation

util.createContract('LiquidAssociation', [d, 1, 1])