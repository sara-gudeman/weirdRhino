var ProductController = require('./productController');

module.exports = function(route) {
  route.post('/searchbytech', ProductController.searchByTech);
  route.post('/searchbyname', ProductController.searchByProductName);
  route.post('/add', ProductController.addProduct);
  route.get('/', ProductController.getProductByName);
};
