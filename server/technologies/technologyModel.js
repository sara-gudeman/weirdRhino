/**
 * TODO: Make some of the fields required
 */
module.exports = function(sequelize, Sequelize) {
  var Technology = sequelize.define('Technology', {
    technology_name: Sequelize.STRING,
    site: Sequelize.STRING,
    category: Sequelize.STRING,
  });

  //Technology.sync();
  return Technology;
}
