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

spliceQueueAndProducts()
.then(toProductModels)
.settle()
.then(wappProducts)
.settle()
.then(getTechnologies)
.settle()
.then(console.log)
.catch(function(e) {
  console.log(e);
})
.finally(function() {
  console.log("All done!")
})
