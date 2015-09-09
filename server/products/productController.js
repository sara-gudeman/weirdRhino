var models = require('../db/models.js');
var _ = require('underscore');
var url = require('url');
var wapp = require('../tasks/wappPromise');

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

//Helper method to get product name from website
var getProductName = function(sitename) {
  var nameParts = url.parse(sitename).hostname.split('.');
  return (nameParts[0] === 'www') ? nameParts[1] : nameParts[0];
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
            $like: str.trim() + '%'
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
        var idQueries = getProductsFromTechResults(result);
        if (idQueries.length === 0) {
          res.status(200).send(JSON.stringify([]));
        } else {
          return Product.findAll({
            where: {
              $or: idQueries
            },
            include: [ Technology ]
          });
        }
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
      },
      include: [ Technology ]
    })
    .then(function(result) {
      res.status(200).send(JSON.stringify(result));
    })
    .catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  },

  addProduct: function(req, res) {
    var website = req.body.site;
    console.log("POST to api/products/add");
    wapp(website)
    .then(function(apps) {
      //console.log("APPS: ", apps);
      if(apps.length < 1) {
        res.send("No apps found");
        throw Error("No apps found");
      }
      return apps.map(function(app) {
        return {technology_name: app};
      });
    })
    .then(function(apps) {
      //console.log("MAPPED APPS: ", apps);
      return Technology.findAll({
        where: {
          $or: apps
        } 
      })
    })
    .then(function(techModels) {
      //console.log("TECH MODELS: ", techModels);
      return [Product.findOrCreate({
        where: {
          product_name: getProductName(website),
          product_url: website
        }
      }), techModels]
    })
    .settle()
    .then(function(productTechTuple) {
      var product = productTechTuple[0].value()[0];
      var technologies = productTechTuple[1].value();
      product.scrape_date = Date.now(); 
      product.setTechnologies(technologies);
      
      //This is a hacky way to unify the return format
      return Product.findOne({
        where: {
          product_name: product.product_name
        },
        include: [{model: Technology}]
      });
        
    })
    .then(function(product) {
      res.json(product);
    })
    .catch(function(e) {
      console.log(e);
      if(!res.headersSent) {
        res.sendStatus(500);
      }
    });
  }

};





