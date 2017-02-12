let util = require('../util.js')
let addresses = require('../addressBook.json')

let token = addresses.Unitoken

util.createContract('Delegation', [token, 75, 3])