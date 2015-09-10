var Promise = require('bluebird');
var url = require('url');
var models = require('../db/models');
var Product = models.Product;
var utils = require('../helpers/queryUtils');


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
        product_name: utils.getProductName(site)
      }
    });
  }));
}
