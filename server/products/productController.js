var models = require('../db/models.js');
var _ = require('underscore');

var Product = models.Product;
var Technology = models.Technology;

// Helper method finds product IDs from query for technology name
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
      // first, query for technology and include list of products using each technology in search
      var result = Technology.findAll({
        where: {
          $or: toSearch
        },
        include: [ Product ]
      })
      // then get product list using products from previous results and include all technologies used by product
      .then(function(result) {
        return Product.findAll({
          where: {
            $or: getProductsFromTechResults(result)
          },
          include: [ Technology ]
        });
      })
      .then(function(result) {
        res.status(200).send(JSON.stringify(result));
      })
      .catch(function(err) {
        res.sendStatus(500);
        console.log(err);
      });
    }
  },

  searchProductName: function(req, res) {
    console.log('products GET request received...');

    // get the product id from the query string
    var productId = req.query.id;
    console.log('product id: ----------------------> ', productId);

    // use the product id to find a single result in the DB
    
    var result = Product.findOne({
      where: {
        id: productId
      }
    })
    .then(function(result) {
      res.status(200).send(JSON.stringify(result));
    })
    .catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  }

};





