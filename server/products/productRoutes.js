var ProductController = require('./productController');

module.exports = function(route) {
  route.post('/', ProductController.searchTech);
};
