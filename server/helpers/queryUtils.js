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
      var RELATION_THRESHOLD = 0.25;
      var sets = {};
      var meta = {
        products: {}, 
        techCount: {},
        results: []
      };
      var techs = [];
      
      //Split each Tech into it's own set 
      for(var i = 0; i < listOfTechs.length; i++) { 
        sets[listOfTechs[i].technology_name] = listOfTechs[i].Products;
      }
      
      //Gather some metadata about sets 
      for(var set in sets) { 
        techs.push(set);
        sets[set].forEach(function(product) {
          meta.products[product.product_name] = product;
          meta.techCount[product.product_name] = 0;
        });
      }

      /**
       * Give each product a point for every 
       * technology it contains that we are looking for
       */ 
      for(var i = 0; i < techs.length; i++) {
        for(var product in meta.products) {

          var prodTechs = meta.products[product].Technologies;
          for(var k = 0; k < prodTechs.length; k++) {
            if(prodTechs[k].technology_name === techs[i]) {
              meta.techCount[product]++;
            }
          }
        }  
      }

      for(var product in meta.techCount) {
        meta.results.push(meta.products[product]);
      }

      //Sort technologies by point score in descending order
      meta.results.sort(function(a, b) {
        return meta.techCount[b.product_name] - meta.techCount[a.product_name];
      }); 

      resolve(meta.results);
    });
  }


}
