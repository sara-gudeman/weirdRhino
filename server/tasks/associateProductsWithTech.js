var models = require('../db/models');

module.exports = function(productTechTuple) {
  var p = productTechTuple[0].value();
  var t = productTechTuple[1].value();
  
  var products = p.map(function(product) {
    var productModel = product.value()[0];
    var productApps = product.value()[1];

    return [productModel, productApps];
  });



 // console.log([products, technologies]);
}
