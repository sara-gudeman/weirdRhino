var wappalyzer = require('wappalyzer');
var url = require('url');
var Product = require('../db/products/productModel');

module.exports = function(site) {
  var options = {
    url: site,
    hostname: url.parse(site)['host'],
    debug: true
  };
  wappalyzer.detectFromUrl(options, function(err, apps, appInfo) {
    /**
     * apps is an array of apps
     * appInfo is a much deeper dive into each app
     */ 
    var currentProduct = new Product({
      product_name: url.parse(site)['host'],
      product_technologies: apps,
      scrape_date: Date.now(),   
      product_url: site
    });

    currentProduct.save(function(err) {
      if(err) {console.log(err);};
    }); 
  });
};

