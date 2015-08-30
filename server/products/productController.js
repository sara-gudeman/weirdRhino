var Product = require('./productModel');

module.exports = {

  searchTech: function(req, res) {
    var searchRegex = new RegExp('^' + req.query.searchString + '.*', 'i');
    console.log('search request received..');
    console.log('req.query: ', req.query);
    console.log('search regex: ', searchRegex);

    Product.find({product_technologies: searchRegex}, function(error, result) {
      if(error) {
        res.sendStatus(500);
      }
      console.log(result);
      res.send(JSON.stringify(result));
    });

  }

};
