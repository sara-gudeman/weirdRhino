var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var cheerio = require('cheerio');

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
