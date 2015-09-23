var Promise = require('bluebird');
var siteQueue = require('./siteQueue');
var models = require('../db/models');
var Product = models.Product;
var Technology = models.Technology;
var spliceQueueAndProducts = require('./scraper-modules/spliceQueueAndProducts');
var wappProducts = require('./scraper-modules/wappProducts');
var toProductModels = require('./scraper-modules/toProductModels');
var associateProductsWithTech = require('./scraper-modules/associateProductsWithTech');
var getTechnologies = require('./scraper-modules/getTechnologies');
var batchProducts = require('./scraper-modules/batchProducts');
var getFavicon = require('./scraper-modules/getFavicon');

var associations = 0;

spliceQueueAndProducts()
.then(batchProducts)
.reduce(function(previousBatch, batch) {
  associations += previousBatch;

  return Promise.settle(previousBatch)
  .then(function() {
    return toProductModels(batch)
    .settle() 
    .then(getFavicon)
    .settle()
    .then(wappProducts)
    .settle()
    .then(getTechnologies)
    .settle()
    .then(associateProductsWithTech)
  });
}, [Promise.resolve(0)])

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

