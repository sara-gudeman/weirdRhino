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
    wappalyzer.detectFromUrl(options, function(err, apps, appInfo) {
      Product.find({product_name: site})
        .then(function(matchedProducts) {
          var currentProduct;
          /** 
            * Query results return in array.
            * The first (only) result should be our document
            */
          if(matchedProducts.length > 0) {
            currentProduct = matchedProducts[0];
            currentProduct.scrape_date = Date.now();
            currentProduct.product_technologies = apps
          } else {
            /**
             * If the results array is empty,
             * our document doesn't exist yet
             */
            currentProduct = new Product({
              product_name: site,
              product_technologies: apps,
              scrape_date: Date.now(),
              product_url: site
            });
            console.log(currentProduct.product_url);
          }
          /**
           * Save whichever document we created/altered
           */
          currentProduct.save(function(err) {
            if(err) {console.log(err);}
          });
        }).catch(function(err) {console.log(err)});
    });
}
