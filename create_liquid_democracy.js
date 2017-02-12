let util = require('./util.js')
let addresses = require('./addressBook.json')

let token = addresses.Unitoken

util.createContract('LiquidDemocracy', [token, 'transferOwnership(address)', 75, 3])