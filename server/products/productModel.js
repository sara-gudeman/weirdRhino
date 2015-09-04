/**
 * TODO: Make some of the fields required.
 */
module.exports = function(sequelize, Sequelize) {
  return sequelize.define('Product', {
    product_name: Sequelize.STRING,
    scrape_date: Sequelize.DATE,
    product_url: Sequelize.STRING,
  });
}
