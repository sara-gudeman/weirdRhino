var Sequelize = require('sequelize');
var Product = require('../products/productModel');

var Technology = Sequelize.define('Technology', {
  technology_name: Sequelize.STRING,
  site: Sequelize.STRING,
  category: Sequelize.STRING
});

Technology.belongsTo(Product);
Technology.sync();

module.exports = Technology;
