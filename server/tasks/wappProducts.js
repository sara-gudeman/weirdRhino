var wappalyzer = require('wappalyzer');
var url = require('url');
var Promise = require('bluebird');
var models = require('../db/models');

module.exports = function(products) {
  return products.map(function(product) {
    return wapp(product.value()[0]);
  });
}
var wapp = function(productModel) {
   var options = {
    url: productModel.product_url,
    hostname: url.parse(productModel.product_url)['host'],
    debug: false
  };
  return new Promise(function(resolve, reject) {
    wappalyzer.detectFromUrl(options, function(err, apps, appInfo) {
      if(err) { 
        reject(err);
      } else { 
        resolve([productModel, apps]);
      }
    });
  });
}
