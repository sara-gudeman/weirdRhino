var Promise = require('bluebird');
var url = require('url');
var models = require('../db/models');
var Product = models.Product;

var getProductName = function(sitename) {
  var nameParts = url.parse(sitename).hostname.split('.');
  return (nameParts[0] === 'www') ? nameParts[1] : nameParts[0];
}

/**
 * This function takes a list of urls and transforms them into Product models.
 * returns an array of product models that exist in DB
 *
 * @param PromiseInspectionArray siteQueue 
 * @return PromiseInspectionArray
 */
module.exports = function(siteQueue) {
  return Promise.all(siteQueue.map(function(site) {
    return Product.findOrCreate({
      where: {
        product_url: site,
        product_name: getProductName(site)
      }
    });
  }));
}
