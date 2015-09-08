var models = require('../db/models.js');
var _ = require('underscore');

var Product = models.Product;
var Technology = models.Technology;

var getProductsFromTechResults = function(result) {
  var productIdQueries = [];
  var ids = {};
  _.map(result, function(techObject) {
    _.each(techObject["Products"], function(product){
      if (!(product["id"] in ids)) {
        productIdQueries.push({"id": product["id"]});
        ids[product["id"]] = true;
      }
    });
  });
  return productIdQueries;
}

module.exports = {

  searchTech: function(req, res) {
    // get search terms
    console.log('post request received...');

    // return empty array if search string is an empty string
    if(req.body.searchString === '') {
      res.send(JSON.stringify([]));
    }
    // else, do a normal search
    else {
      var searchTerms = req.body.searchString.split(',');
      // construct object array for DB query
      // trim whitespace and convert to regex
      var toSearch = _.map(searchTerms, function(str, index) {
        return {
          technology_name: {
            $like: str + '%'
          }
        }
      });
      console.log('search request received..');
      console.log('searchString: ----------------------->', req.body.searchString);
      console.log('toSearch: ----------------------->', toSearch);

      // use toSearch to query the DB
      var result = Technology.findAll({
        where: {
          $or: toSearch
        },
        include: [ Product ]
      })
      .then(function(result) {
        return Product.findAll({
          where: {
            $or: getProductsFromTechResults(result)
          },
          include: [ Technology ]
        })
      })
      .then(function(result) {
        res.send(result);
      })
      .catch(function(err) {
        // error callback
        console.log(err);
      });
    }
  },

  searchProductName: function(req, res) {
    console.log('products GET request received...');

    // get the product name from the query string
    var productName = req.query.name;
    console.log('product name: ----------------------> ', productName);

    // use the product name to find a single result in the DB
    Product.findOne({product_name: productName}, function(error, result) {
      if(error) {
        res.sendStatus(500);
      }
      res.send(JSON.stringify(result));
    });
  }

};





