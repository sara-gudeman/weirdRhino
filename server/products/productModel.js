var db = require('../db/models').sequelize;
var Sequelize = require('sequelize');

/**
 * TODO: Make some of the fields required.
 */
var Product = db.define('Product', {
  product_name: Sequelize.STRING,
  scrape_date: Sequelize.DATE,
  product_url: Sequelize.STRING,
});

Product.sync(); 

module.exports = Product;
