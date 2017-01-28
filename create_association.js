let util = require('./util.js')
let addresses = require('./addressBook.json')

let token = addresses.Unitoken

util.createContract('Association', [token, 4000, 1],
  function(err, myContract){
    if(!err) {
       if(!myContract.address) {
           console.log(myContract.transactionHash)
       } else {
           console.log(myContract.address)
       }
    }
    else{
      console.error(err)
    }
  }
)