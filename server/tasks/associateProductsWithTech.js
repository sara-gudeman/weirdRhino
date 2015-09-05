var Promise = require('bluebird');

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
       tech.technology_name = productApps[i]
      })[0]);
    }

    for(var i = 0; i < appsToAssociate; i++) {
      productModel.setTechnologies(appsToAssociate[i]);
    }

    productModel.scrape_date = Date.now();
    return productModel.save()
    .then(function(model) {
      console.log(model)
    })
    .catch(function(e) {
      console.log("Error saving model: ", e);
    });
  });
}
