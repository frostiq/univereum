let util = require('./util.js')
let addresses = require('./addressBook.json')

let token = addresses.Unitoken

util.createContract('LiquidDemocracy', [token, 'transferOwnership(address)', 75, 3],
  function(err, myContract){
    if(!err) {
       if(!myContract.address) {
           console.log(myContract.transactionHash)
       } else {
           console.log(myContract.address) // the contract address
       }
    }
    else{
      console.error(err)
    }
  }
)