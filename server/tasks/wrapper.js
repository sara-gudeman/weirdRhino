var wappalyzer = require('wappalyzer');
var url = require('url');
var Product = require('../products/productModel');

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
    Product.find({product_name: url.parse(site)['host']})
      .then(function(matchedProducts) {
        var currentProduct;
        /** 
         * Query results return in array.
         * The first (only) result should be our document
         */
        if(matchedProducts.length > 0) {
          currentProduct = matchedProducts[0];
          currentProduct.scrape_date = Date.now(),
          currentProduct.product_technologies = apps
        } else {
          /**
           * If the results array is empty,
           * our document doesn't exist yet
           */
          currentProduct = new Product({
            product_name: url.parse(site)['host'],
            product_technologies: apps,
            scrape_date: Date.now(),
            product_url: site
          });
        }
        /**
         * Save whichever document we created/altered
         */
        currentProduct.save(function(err) {
          if(err) {console.log(err);};
        });
      })
      .catch(function(error) {
        console.log(error);
      }); 
  });
};

