var Product = require('./productModel');
var _ = require('underscore');

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
          product_technologies: new RegExp(str.trim() + '.*', 'i')
        };
      });
      console.log('search request received..');
      console.log('searchString: ----------------------->', req.body.searchString);
      console.log('toSearch: ----------------------->', toSearch);

      // use toSearch to query the DB
      Product.find({$or: toSearch}, function(error, result) {
        if(error) {
          res.sendStatus(500);
        }
        res.send(JSON.stringify(result));
      });
    }
  }

};
