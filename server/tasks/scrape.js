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
  runTime += 20;
  console.log("---Info Gathering has taken " + runTime + " seconds---");
  if(runTime > total) {
    console.log("[!!!] Scan has reached 95% success and run overtime. ");
    console.log("[!!!] Shutting down the scan and closing DB connection.");
    mongoose.disconnect();
    process.exit(0);
  }
}, 20000);

Product.find()
  .then(function(results) {
    for(var i = 0; i < results.length; i++) {
      /** Only push unique sites onto queue */
      if(siteQueue.indexOf(results[i].product_url) === -1) {
        siteQueue.push(results[i].product_url);
      }
    }
    total = siteQueue.length;
    console.log("Estimated run time " + total + " seconds");
    return siteQueue;
  })
  .then(function(queue) {
    for(var i = 0; i < queue.length; i++) {
      wrapp(queue[i]);
    }
  });


