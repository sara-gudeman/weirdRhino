var ProductController = require('./productController');

module.exports = function(route) {
  route.post('/', ProductController.searchTech);
  route.post('/add', ProductController.addProduct);
  route.get('/', ProductController.searchProductName);
};
