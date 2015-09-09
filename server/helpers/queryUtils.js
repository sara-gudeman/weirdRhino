var _ = require('underscore');

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
  }

}
