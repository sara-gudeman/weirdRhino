var Promise = require('bluebird');
var siteQueue = require('./siteQueue');
var models = require('../db/models');
var Product = models.Product;
var Technology = models.Technology;
var spliceQueueAndProducts = require('./spliceQueueAndProducts');
var wappProducts = require('./wappProducts');
var toProductModels = require('./toProductModels');
var associateProductsWithTech = require('./associateProductsWithTech');
var getTechnologies = require('./getTechnologies');
var batchProducts = require('./batchProducts');

var associations = 0;

spliceQueueAndProducts()
.then(batchProducts)
.reduce(function(previousBatch, batch) {
  associations += previousBatch;

  return Promise.settle(previousBatch)
  .then(function() {
    return toProductModels(batch)
    .then(wappProducts)
    .settle()
    .then(getTechnologies)
    .settle()
    .then(associateProductsWithTech)
  });
}, [Promise.resolve(0)])
.catch(function(e) {
  console.log(e.message);
})
.finally(function(finished) {
  var count = 0;
  associations = associations.split('');
  for(var i = 0; i < associations.length; i++) {
    if(associations[i] == parseInt(associations[i], 10)) {
      count += parseInt(associations[i], 10);
    }
  }
  console.log("Found " + count + " associations");
})

