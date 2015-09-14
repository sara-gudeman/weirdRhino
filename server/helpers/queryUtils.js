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
  }


}
