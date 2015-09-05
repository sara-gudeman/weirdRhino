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

spliceQueueAndProducts()
.then(batchProducts)
.reduce(function(previousBatch, batch) {
  return Promise.settle(previousBatch)
  .then(function() {
    return toProductModels(batch)
    .then(wappProducts)
    .settle()
    .then(getTechnologies)
    .settle()
    .then(associateProductsWithTech)
  });
}, [Promise.resolve("Seed")])
.catch(function(e) {
  console.log(e.message);
})
.finally(function(finished) {
  console.log(finished);
})

