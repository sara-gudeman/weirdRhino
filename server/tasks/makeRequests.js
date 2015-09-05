var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var models = require('../db/models');
var Product = models.Product;

module.exports = function(productUrlArray) {
  return Promise.map(productUrlArray, function(product) {
    console.log("Sent request to: ", product);
    return request(product);
  })
}

