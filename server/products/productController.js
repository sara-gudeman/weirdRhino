var models = require('../db/models');
var _ = require('underscore');
var url = require('url');
var wapp = require('../tasks/wappPromise');
var utils = require('../helpers/queryUtils');

var Product = models.Product;
var Technology = models.Technology;

module.exports = {

  searchByTech: function(req, res) {
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
        // set to empty string if there is a trailing space at end of search string
        if (str === ' ' || str === '') {
          return '';
        } else {
          return {
            technology_name: {
              $like: '%' + str.trim() + '%'
            }
          }
        }
      });
      //filter out any empty strings in search array
      toSearch = _.filter(toSearch, function(searchString) {
        return searchString !== '';
      });

      // use toSearch to query the DB
      // first, query for technology and include list of products using each technology in search
      var result = Technology.findAll({
        where: {
          $or: toSearch
        },
        include: [{
          model: Product,
          include: [Technology]
        }]
      })
      .then(utils.intersectSets)
      .then(function(result) {
        // send back only one page of data
        var limit = 25;
        var offset = (req.body.resultPage - 1) * limit;
        return result.slice(offset, offset + limit);
      })
      .then(function(result) {
        res.set({'Content-Type': 'application/json'});
        res.status(200).send(JSON.stringify(result));
      })
      .catch(function(err) {
        if(!res.headersSent) {
          res.sendStatus(500);
        }
        console.log(err);
      });
    }
  },

  searchByProductName: function(req, res) {
    // get search terms
    var searchString = req.body.searchString;
    // if empty string, return empty array
    if (searchString === '') {
      res.set({'Content-Type': 'application/json'});
      res.send(JSON.stringify([]));
    } else {
      Product.findAll({
        where: {
          // search for matches in product name OR product url
          // requires wildcard in search query
          $or: [
            {
              product_name: {
                $like: '%' + searchString.trim() + '%'
              }
            }
          ]
        },
        include: [ Technology ],
        offset: (req.body.resultPage - 1) * 25,
        limit: 25
      })
      .then(function(results) {
        // use returned results to get tech stack for found companies
        res.set({'Content-Type': 'application/json'});
        res.status(200).send(JSON.stringify(results));
      })
      .catch(function(err) {
        res.sendStatus(500);
        console.log(err);
      });
    }

  },

  findProductByName: function(req, res) {
    // get the product name from the query string
    var productName = req.query.name;
    // use the product name to find a single result in the DB
    var result = Product.findOne({
      where: {
        product_name: productName
      },
      include: [ Technology ]
    })
    .then(function(result) {
      if (result.product_views === null) {
        result.product_views = 1;
      } else {
        result.product_views ++;
      }
      result.save();
      return result;
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
    if(!url.parse(website)['protocol']) {
      website = 'http://' + website;
    }
    wapp(website)
    .then(function(apps) {
      if(apps.length < 1) {
        Product.findOrCreate({
        where: {
          product_name: utils.getProductName(website),
          product_url: website
        }
      })
      res.json({product_name: utils.getProductName(website)});
      throw Error("No apps!");
      }
      return apps.map(function(app) {
        return {technology_name: app};
      });
    })
    .then(function(apps) {
      return Technology.findAll({
        where: {
          $or: apps
        }
      })
    })
    .then(function(techModels) {
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
    })
    .then(function(product) {
      res.json({product_name: utils.getProductName(website)});
    })
    .catch(function(e) {
      console.log(e);
      if(!res.headersSent) {
        res.sendStatus(500);
      }
    });
  }

};
