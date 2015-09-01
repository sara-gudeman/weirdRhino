var Sequelize = require('../db/database');
var Technology = require('../technologies/technologyModel');

/**
 * TODO: Make some of the fields required.
 */
var Product = Sequelize.define('Product', {
  product_name: Sequelize.STRING,
  scrape_date: Sequelize.DATE,
  product_url: Sequelize.STRING,
});

Product.hasMany(Technology, {as: "Technologies"});
Product.sync(); 

module.exports = Product;
