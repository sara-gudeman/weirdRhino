var ProductController = require('./productController');

module.exports = function(route) {
  route.get('/', ProductController.searchTech);
};
