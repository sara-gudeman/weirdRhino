var Sequelize = require('sequelize');
var Product = require('../products/productModel');

var Technology = Sequelize.define('Technology', {

});

Technology.belongsTo(Product);
Technology.sync();

module.exports = Technology;
