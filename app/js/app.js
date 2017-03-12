
$(document).ready(function () {
  console.log("deployed at: " + Unitoken.address)
  Unitoken.symbol().then(function (symbol) {
    $("#tests").append("<br>test 1: " + symbol);
  });
});

