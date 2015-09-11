var TechnologyController = require('./technologyController');

module.exports = function(route) {
  route.get('/', TechnologyController.getTechnologyByName);
  route.post('/searchbyname', TechnologyController.searchByTechnologyName);
};
