//import React from 'react';
//import ReactDOM from 'react-dom';

$(document).ready(function () {
  console.log("deployed at: " + Unitoken.address)
});

Unitoken.symbol().then(function (symbol) {
  ReactDOM.render(
    <h4>test 12: {symbol}</h4>,
    document.getElementById("tests")
  )
})

