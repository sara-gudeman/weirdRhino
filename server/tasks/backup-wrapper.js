var wappalyzer = require('wappalyzer');
var url = require('url');
var Promise = require('bluebird');
var models = require('../db/models');
var Product = models.Product;
var Technology = models.Technology;

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
  var storage = {};

  return new Promise(function(resolve, reject) {
    wappalyzer.detectFromUrl(options, function(err, apps, appInfo) {
      storage.site
      if(err) { 
        reject(err);
      } else if(!apps || apps.length < 1) {
        reject( new Error("Apps came back null or undefined"));
      } else {

        /**
         * Need local variables object b/c
         * all functions are run in global/undefined
         * context.
         */
        var locals = {};
        locals.techPromises = []; 
        locals.apps = apps;
        locals.options = options;

        for(var i = 0; i < locals.apps.length; i++) {  
          locals.techPromises.push(Technology.findOrCreate({
            where: {
              technology_name: locals.apps[i]
            }
          }));
        }
        Promise.all(locals.techPromises)
          .then(function(technologies) {
            locals.technologies = technologies;
            Product.findOrCreate({
              where: {
                product_name: getProductName(locals.options.url),
                product_url: locals.options.url
              }
            }).spread(function(product, created) {
              locals.product = product;
              product.scrape_date = Date.now();
              for(var i = 0; i < locals.technologies.length; i++) {
                locals.product.setTechnologies(locals.technologies[i]);
              }
              locals.product.save()
                .then(function(product) {
                  resolve(product);
                });
            });
        });
      }
    });
  });
}
