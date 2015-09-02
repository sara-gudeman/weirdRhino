var db = require('../db/database');
var Sequelize = require('sequelize');

/**
 * TODO: Make some of the fields required
 */
var Technology = db.define('Technology', {
  technology_name: Sequelize.STRING,
  site: Sequelize.STRING,
  category: Sequelize.STRING,
});

Technology.sync();

module.exports = Technology;
