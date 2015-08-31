var wrapp = require('./wrapper');
var fs = require('fs');
var url = require('url');
var Promise = require('bluebird');
var Product = require('../products/productModel');
var siteQueue = require('./siteQueue');
/**
 * Maybe server hasn't spun up connection to db
 */
require('../db/database');

/**
 * Enqueue all of the product urls
 * These are assumed to be unique from the
 * stored queue of sites.
 */
Product.find()
  .then(function(results) {
    for(var i = 0; i < results.length; i++) {
      /** Only push unique sites onto queue */
      if(siteQueue.indexOf(results[i].product_url) === -1) {
        siteQueue.push(results[i].product_url);
      }
    }
    return siteQueue;
  })
  .then(function(queue) {
    console.log(queue);
    while(queue.length > 0) {
      /** 
       * TODO: Try to wrapp each site, but set a timeout
       * TODO: Have wrapp return status codes
       * */
      var currentSite = queue.shift();
      wrapp(currentSite);
    }
  })
  .catch(function(e) {
    console.log("ERROR: ", e);
  });
