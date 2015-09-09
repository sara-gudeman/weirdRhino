// require necessary models from synced db
var models = require('../db/models');
// var queryUtils = require('../helpers/queryUtils');

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
      res.status(200).send(JSON.stringify(results));
    })
    .catch(function(err) {
      res.sendStatus(500);
      console.log(err);
    });
    // use returned results to get tech stack for found companies
    
    // send final result of db query
  }
};