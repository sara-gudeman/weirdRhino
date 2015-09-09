// require necessary models from synced db
var models = require('../db/models');

// get models specific to our queries
var Product = models.Product;
var Technology = models.Technology;

module.exports = {
  // post request: enter a 'product' and get its tech stack
  searchTechStack: function(req, res) {
    console.log('post request for searching stack received');
    console.log(req.body.searchString);
    
    // get search terms
    var searchString = req.body.searchString;
    // if empty string, return empty array
    if (searchString === '') {
      res.send(JSON.stringify([]));
    }
    // use search terms to locate products
    
    //    - search by url
    //    - search by product name
    //    -- need a db query for this ^
    //    -- **need to update query based on every keystroke
    //    -- requires wildcard in search query 
    // use returned results to get tech stack for found companies
    
    // send final result of db query
  }
};