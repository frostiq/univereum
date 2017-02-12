let util = require('./util.js')
let addresses = require('./addressBook.json')

let token = addresses.Unitoken

util.createContract('Association', [token, 4000, 1])