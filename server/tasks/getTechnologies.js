var models = require('../db/models');
var Technology = models.Technology;
var apps = require('./apps');

module.exports = function(wappedProducts) {
  var techModels = []
  for(var tech in apps.apps) {
    techModels.push(Technology.findOrCreate({
      where: {
        technology_name: tech,
        site: apps.apps[tech].website
      }
    }));
  }
  return Promise.all([wappedProducts, Promise.all(techModels)]);
}
