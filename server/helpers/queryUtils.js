var _ = require('underscore');
var Promise = require('bluebird');
var url = require('url');

var models = require('../db/models');
var User = models.User;
var Technology = models.Technology;
var Product = models.Product;

module.exports = {

  pluckFieldFromJoin: function(result, tableName, fieldName) {
    var queryResults = [];
    var ids = {};
    var queryObject;
    _.map(result, function(techObject) {
      _.each(techObject[tableName], function(product){
        if (!(product[fieldName] in ids)) {
          queryObject = {};
          queryObject[fieldName] = product[fieldName];
          queryResults.push(queryObject);
          ids[product[fieldName]] = true;
        }
      });
    });
    return queryResults;
  },

  getProductName: function(site) {
    var nameParts = url.parse(site).hostname.split('.');
    if(nameParts[0] === 'www') {
      return nameParts.splice(1, nameParts.length - 1).join('.');
    } else {
      return nameParts.splice(0, nameParts.length - 1).join('.');
    }
  },

  getUserByName: function(name) {
    return new Promise(function(resolve, reject) {
      User.findOne({
        where: {username: name},
        include: [
          {
            model: Technology
          },
          {
            model: Product,
            include: {
              model: Technology
            }
          }
        ]
      })
      .then(resolve)
      .catch(reject);
    });
  },

  intersectSets: function(listOfTechs) {
    return new Promise(function(resolve, reject) {
      var sets = {};
      var results = {
        product_names: [],
        products: [], 
      };
      var techs = [];
      
      //Split each Tech into it's own set 
      for(var i = 0; i < listOfTechs.length; i++) { 
        sets[listOfTechs[i].technology_name] = listOfTechs[i].Products;
      }
      
      /**
       * Push unique products into one iterable ,
       * and grab a list of all the techs to check for
       */
      for(var set in sets) { 
       
        techs.push(set);
        sets[set].forEach(function(product) {
          if(~results.product_names.indexOf(product.product_name)) {
            results.products.push(product);
          }
        });
      }

      results.products.filter(function(product) {
        //check for intersection
      });
      resolve(listOfTechs);
    });
  }


}
