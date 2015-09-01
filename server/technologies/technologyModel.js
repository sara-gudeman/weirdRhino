var Sequelize = require('../db/database');
var Product = require('../products/productModel');

/**
 * TODO: Make some of the fields required
 */
var Technology = Sequelize.define('Technology', {
  technology_name: Sequelize.STRING,
  site: Sequelize.STRING,
  category: Sequelize.STRING,
});

Technology.belongsTo(Product);
Technology.sync();

module.exports = Technology;
