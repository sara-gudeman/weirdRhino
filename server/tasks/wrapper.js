var wappalyzer = require('wappalyzer');
var url = require('url');
var Promise = require('bluebird');
var models = require('../db/models');
var Product = models.Product;
var Technology = models.Technology;

module.exports = function(response) {
  var options = {
    url: site,
    hostname: url.parse(site)['host'],
    debug: false
  };

  var data = {
    html: response.body,
    headers: response.headers,
    url: response.url
  };
    

  return new Promise(function(resolve, reject) {
    wappalyzer.detectFromHTML(options, data, function(err, apps, appInfo) {
      storage.site
      if(err) { 
        reject(err);
      } else if(!apps || apps.length < 1) {
        reject( new Error("Apps came back null or undefined"));
      } else {
        console.log(apps);
        resolve(apps);
      }
    });
  });
}
