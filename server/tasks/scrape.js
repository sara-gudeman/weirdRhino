var wrapp = require('./wrapper');
var fs = require('fs');
var url = require('url');
var Promise = require('bluebird');
var Product = require('../products/productModel');
var siteQueue = require('./siteQueue');
var mongoose = require('mongoose');
/**
 * Maybe server hasn't spun up connection to db
 */
var db = require('../db/database');

var completed = 0;
var total;
var runTime = 0;

console.log("About to find things");

/**
 * Set a timeout b/c batch scanning often leads to a non
 * 100% success rate.
 * Wait 5 minutes and if the scan is more than 95% complete,
 * then let's call it a day by closing out the database
 * connection and callying a good all process.exit(0);
 */
setInterval(function() {
  runTime += 60;
  console.log("---Info Gathering has taken " + runTime + " seconds---");
  if(completed / total > 0.95 &&
     runTime > 5 * 60000) {
    console.log("[!!!] Scan has reached 95% success and run overtime. ");
    console.log("[!!!] Shutting down the scan and closing DB connection.");
    mongoose.disconnect();
    process.exit(0);
  }
}, 60000);

Product.find()
  .then(function(results) {
    for(var i = 0; i < results.length; i++) {
      /** Only push unique sites onto queue */
      if(siteQueue.indexOf(results[i].product_url) === -1) {
        siteQueue.push(results[i].product_url);
      }
    }
    total = siteQueue.length;
    return siteQueue;
  })
  .then(function(queue) {
    console.log("Started Mapping sites to wrapp promises");
    return queue.map(function(site) {
      return wrapp(site)
        .then(function(site, apps) {
          console.log("Progress: ", (completed/total * 100).toFixed(2), site);
          Product.find({product_name: site})
            .then(function(matchedProducts) {
              var currentProduct;
              /** 
                * Query results return in array.
                * The first (only) result should be our document
                */
              if(matchedProducts.length > 0) {
                currentProduct = matchedProducts[0];
                currentProduct.scrape_date = Date.now();
                currentProduct.product_technologies = apps
              } else {
                /**
                 * If the results array is empty,
                 * our document doesn't exist yet
                 */
                currentProduct = new Product({
                  product_name: site,
                  product_technologies: apps,
                  scrape_date: Date.now(),
                  product_url: site
                });
              }
              /**
               * Save whichever document we created/altered
               */
              currentProduct.save(function(err) {
                if(err) {console.log(err);}
                completed++;
              });
            })
            .catch(function(error) {
              console.log(error);
            });
        })
    });
  })
  .all(function(queue) {
    console.log(queue);
    console.log("Finished mapping, disconnecting from DB");
    db.disconnect();
  })
  .catch(function(error) {
    console.log(error);
  });

