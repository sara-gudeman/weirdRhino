var wappalyzer = require('wappalyzer');
var url = require('url');
var Product = require('../products/productModel');
var Promise = require('bluebird');

module.exports = function(site) {
  var options = {
    url: site,
    hostname: url.parse(site)['host'],
    debug: false
  };
  return new Promise(function(resolve, reject) {
    wappalyzer.detectFromUrl(options, function(err, apps, appInfo) {
      if(err) {
        reject(err);
      } else {
        resolve(site, apps, appInfo);
      }
    });
  });
}
