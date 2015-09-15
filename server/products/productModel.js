/**
 * TODO: Make some of the fields required.
 */
module.exports = function(sequelize, Sequelize) {
  return sequelize.define('Product', {
    product_name: Sequelize.STRING,
    scrape_date: Sequelize.DATE,
    product_url: Sequelize.STRING,
    favicon_url: Sequelize.STRING,
    product_views: {type: Sequelize.INTEGER, defaultValue: 0},
    product_followers: {type: Sequelize.INTEGER, defaultValue: 0}
  });
}
