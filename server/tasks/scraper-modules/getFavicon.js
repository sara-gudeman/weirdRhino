var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var cheerio = require('cheerio');
var url = require('url');

module.exports = function(products) {
  return Promise.all(products.map(function(product) {
    return getFavicon(product.value());
  }));
}

var getFavicon = function(productModel) {
  try {
    return request.getAsync(productModel[0].product_url)
      .spread(function(response, body) {
        var $ = cheerio.load(body);
        var favicon = $('link[rel="shortcut icon"]').attr('href');
        if(favicon) {

          //Make relative urls absolute
          var parsedFavicon = url.parse(favicon);
          if(!parsedFavicon.hostname) {
            favicon = productModel[0].product_url + favicon;
          }

          productModel[0].favicon_url = favicon;
          //productModel.save();
        }
        return [productModel];
      })
      .catch(function(e) {
        console.log(e.message);
      });
  } catch (e) {
    console.log("getFavicon Error: ", e.message);
  }
};
