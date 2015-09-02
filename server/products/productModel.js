/**
 * TODO: Make some of the fields required.
 */
module.exports = function(sequelize, Sequelize) {
  var Product = sequelize.define('Product', {
    product_name: Sequelize.STRING,
    scrape_date: Sequelize.DATE,
    product_url: Sequelize.STRING,
  });

  Product.sync(); 
  return Product;
}
