var Promise = require('bluebird');
var models = require('../db/models');

module.exports = function(productTechTuple) {
  var products = productTechTuple[0].value();
  var technologies = productTechTuple[1].value();
  
  return Promise.map(products, function(product) {
    var productModel = product.value()[0];
    var productApps = product.value()[1];
    var appsToAssociate = [];

    /**
     * Keep from executing below associations with
     * no apps to associate. Would likely throw
     * and error, but will definitely save a little
     * time and a DB call
     */
    if(productApps.length <= 0) {
      return "None to associate";
    }

    for(var i = 0; i < productApps.length; i++) {
      appsToAssociate.push(technologies.filter(function(tech) {
        return tech[0].technology_name === productApps[i]
      })[0]);
    }
    productModel.scrape_date = Date.now();
    for(var i = 0; i < appsToAssociate.length; i++) {
      productModel.setTechnologies(appsToAssociate[i][0]);
    }
    return "Complete";
  });
}
