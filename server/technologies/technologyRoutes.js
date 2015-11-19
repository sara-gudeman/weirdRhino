var TechnologyController = require('./technologyController');

module.exports = function(route) {
  route.get('/', TechnologyController.getTechnologyByName);
  route.get('/searchbyname', TechnologyController.searchByTechnologyName);
};
