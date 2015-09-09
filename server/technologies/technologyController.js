var technologyController = require('./technologyModel');

module.exports = {
  // post request: enter a 'product' and get its tech stack
  searchTechStack: function(req, res) {
    console.log('post request for searching stack received');
    console.log(req.body.searchString);
    
    // get search terms
    // use search terms to locate companies w/name matching regex string
    // -- need a db query
    // send result of db query
  }
};