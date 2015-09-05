var Promise = require('bluebird');
var siteQueue = require('./siteQueue');
var models = require('../db/models');
var Product = models.Product;
var spliceQueueAndProducts = require('./spliceQueueAndProducts');
var makeRequests = require('./makeRequests');
var wappResponses = require('./wappResponses');

spliceQueueAndProducts()
.then(makeRequests)
.settle(wappResponses)
.catch(function(e) {
  console.log(e);
});
