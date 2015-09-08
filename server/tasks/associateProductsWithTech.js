var Promise = require('bluebird');
var models = require('../db/models');

/**
 * Function takes in a tuple of product models and tech models,
 * then associates every product model with the correct tech models,
 * returning a promise inspection array that resolves to a string for
 * each value
 *
 * @param PromiseInspectionArray productTechTuple
 * @return PromiseInspectionArray 
 */
module.exports = function(productTechTuple) {
  var products = productTechTuple[0].value();
  var technologies = productTechTuple[1].value();
  return Promise.map(products, function(product) {
    if(product.value() === null) {
      console.log("Incorrect or errored out response");
      return 0;
    }
    var productModel = product.value()[0];
    var productApps = product.value()[1];
    var appsToAssociate = [];
    console.log(productModel.product_name, productApps, productModel.favicon_url);

    /**
     * Keep from executing below associations with
     * no apps to associate. Would likely throw
     * and error, but will definitely save a little
     * time and a DB call
     */
    if(!productApps) {
      return 0;
    }

    if(productApps.length <= 0) {
      return 0;
    }

    for(var i = 0; i < productApps.length; i++) {
      appsToAssociate.push(technologies.filter(function(tech) {
        return tech[0].technology_name === productApps[i]
      })[0]);
    }
    productModel.scrape_date = Date.now();
    for(var i = 0; i < appsToAssociate.length; i++) {
      appsToAssociate[i] = appsToAssociate[i][0];
    }
    productModel.setTechnologies(appsToAssociate);
    productModel.save();
    return appsToAssociate.length;
  });
}
