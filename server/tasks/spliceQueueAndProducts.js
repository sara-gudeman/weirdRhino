var Promise = require('bluebird');
var models = require('../db/models');
var Product = models.Product;
var Technology = models.Technology;
var siteQueue = require('./siteQueue');
/**
 * This function pulls products from the database,
 * and combines them with queued urls to scrape.
 *
 * Returns a promise that resolves to a list of urls
 */
module.exports = function() {
  return new Promise(function(resolve, reject) {
    Product.findAll()
      .then(function(products){
        for(var i = 0; i < products.length; i++) {
          if(siteQueue.indexOf(products[i].product_url === -1)) {
            siteQueue.push(products[i].product_url);
          }
        }

        resolve(siteQueue);
      })
      .catch(function(e) {
        console.log("Error combinging existing Products and new sites");
        reject(new Error("Error combining existing Products and new sites"));
      });
  });
}
