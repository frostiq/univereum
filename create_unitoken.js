let util = require('./util.js')

util.createContract('Unitoken', [100000, 'Unitoken_v0.0.3', 2, 'UNI', '0x0'],
  function(err, myContract){
    if(!err) {
       if(!myContract.address) {
           console.log(myContract.transactionHash)
       } else {
           console.log(myContract.address) // the contract address
           console.log('Total supply = ' + myContract.totalSupply())
       }
    }
    else{
      console.error(err)
    }
  }
)

