/**
 * TODO: Make some of the fields required
 */
module.exports = function(sequelize, Sequelize) {
  return sequelize.define('Technology', {
    technology_name: Sequelize.STRING,
    site: Sequelize.STRING,
    category: Sequelize.STRING,
  });
}
