var wappalyzer = require('wappalyzer');
var url = require('url');
var Promise = require('bluebird');
var models = require('../db/models');
var Product = models.Product;

// helper function to get product name from site URL
var getProductName = function(site) {
  var hostname = url.parse(site).hostname;
  var nameParts = hostname.split('.');
  if(nameParts[0] === 'www') {
    return nameParts[1];
  } else {
    return nameParts[0];
  }
};

module.exports = function(site) {
  var options = {
    url: site,
    hostname: url.parse(site)['host'],
    debug: false
  };
    wappalyzer.detectFromUrl(options, function(err, apps, appInfo) {
      Product.findAll({where: {product_name: site}})
        .then(function(matchedProducts) {
<<<<<<< 918cb7f7066504186b9164228d0cb295a5bda554
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
              product_name: getProductName(site),
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
});
}
