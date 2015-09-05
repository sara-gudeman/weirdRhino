var models = require('../db/models');
var Technology = models.Technology;
var apps = require('./apps');

/**
 * Takes in products and their apps and then 
 * findOrCreates tech in the tech table
 * returning a tuple containing the productModels array
 * at index 0 and all technology models at index 1
 *
 * @param PromiseInspectionArray wappedProducts
 * @return PromiseInspectionArray [productModels, PromiseInspectionArray technologies]
 */
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
