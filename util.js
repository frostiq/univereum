exports.createContract = function(web3, contractJson, creatorAccount, params, callback){
  let bytecode = '0x' + contractJson.bytecode;
  let gasEstimate = web3.eth.estimateGas({data: bytecode});
  let ContractType = web3.eth.contract(JSON.parse(contractJson.abi));
  params = params.concat(
    { data: bytecode, gas: gasEstimate * 2, from: creatorAccount},
    callback)
    
  var instance = ContractType.new.apply(ContractType, params);

  return instance;
}