//import React from 'react';
//import ReactDOM from 'react-dom';

$(document).ready(function () {
  console.log("deployed at: " + Unitoken.address)
});

Unitoken.symbol().then(symbol => {
  Unitoken.balanceOf(web3.eth.defaultAccount).then(balance => {
      ReactDOM.render(
        <h4>Yor balance: {balance.toFixed(2)} {symbol}</h4>,
        document.getElementById("tests")
    )
  })
})

