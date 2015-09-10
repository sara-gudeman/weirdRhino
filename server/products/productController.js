var models = require('../db/models');
var _ = require('underscore');
var url = require('url');
var wapp = require('../tasks/wappPromise');
var utils = require('../helpers/queryUtils');

var Product = models.Product;
var Technology = models.Technology;

module.exports = {

  searchByTech: function(req, res) {
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
        var idQueries = utils.pluckFieldFromJoin(result, "Products", "id");
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
        res.set({'Content-Type': 'application/json'});
        res.status(200).send(JSON.stringify(result));
      })
      .catch(function(err) {
        res.sendStatus(500);
        console.log(err);
      });
    }
  },

  searchByProductName: function(req, res) {
    console.log('post request for searching stack received');
    console.log(req.body.searchString);
    
    // get search terms
    var searchString = req.body.searchString;
    // if empty string, return empty array
    if (searchString === '') {
      res.send(JSON.stringify([]));
    } else {
      Product.findAll({
        where: {
          // search for matches in product name OR product url
          // requires wildcard in search query 
          // **need to update query based on every keystroke
          // **need to display url next to product name to show user what matches
          $or: [
            {
              product_name: {
                $like: searchString.trim() + '%'
              }
            },
            {
              // search by product url
              product_url: {
                $like: searchString.trim() + '%'
              }
            }
          ]
        },
        include: [ Technology ]
      })
      .then(function(results) {
        // use returned results to get tech stack for found companies
        res.status(200).send(JSON.stringify(results));
      })
      .catch(function(err) {
        res.sendStatus(500);
        console.log(err);
      });
    }
    // use search terms to locate products
    
    // send final result of db query
  },

  getProductByName: function(req, res) {
    console.log('products GET request received...');

    // get the product id from the query string
    var productName = req.query.name;
    console.log('product name: ----------------------> ', productName);

    // use the product id to find a single result in the DB
    
    var result = Product.findOne({
      where: {
        product_name: productName
      },
      include: [ Technology ]
    })
    .then(function(result) {
      res.set({'Content-Type': 'application/json'});
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
          product_name: utils.getProductName(website),
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
