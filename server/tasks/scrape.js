var wrapp = require('./wrapper');
var url = require('url');
var Promise = require('bluebird');
var request = require('request');
var siteQueue = require('./siteQueue');
var models = require('../db/models');
var Product = models.Product;
var spliceQueueAndProducts = require('./spliceQueueAndProducts');
Promise.promisifyAll(request);

var requestArray = [];


spliceQueueAndProducts()
.then(function(results) {
  console.log(results);
})
.catch(function(e) {
  console.log(e);
});
