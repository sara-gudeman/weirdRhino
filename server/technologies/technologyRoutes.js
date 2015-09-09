var technologyController = require('./technologyController');

module.exports = function(route) {
  route.post('/', technologyController.searchTechStack);
};