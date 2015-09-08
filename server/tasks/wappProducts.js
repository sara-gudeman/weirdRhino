var wappalyzer = require('wappalyzer');
var url = require('url');
var Promise = require('bluebird');
var models = require('../db/models');

/**
 * This function takes in productModels and maps them to tuples
 * that are [productModel, [appsAssociatedWithProduct]].
 *
 * @params PromiseInspectionArray products
 * @returns [[PromiseModel, [PromiseInspectionArray of apps]]
 */
module.exports = function(products) {
  return products.map(function(product) {
    try {
      return wapp(product.value()[0]);
    } catch(e) {
      console.log("Error reading value of request response: ", e.message);
      return Promise.resolve(null);
    }
  });
}

var wapp = function(productModel) {
   var options = {
    url: productModel[0].product_url,
    hostname: url.parse(productModel[0].product_url)['host'],
    debug: false
  };
  return new Promise(function(resolve, reject) {
    wappalyzer.detectFromUrl(options, function(err, apps, appInfo) {
      if(err) { 
        reject(err);
      } else { 
        resolve([productModel[0], apps]);
      }
    });
  });
}
