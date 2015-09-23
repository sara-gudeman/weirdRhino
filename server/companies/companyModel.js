module.exports = function(sequelize, Sequelize) {
  return sequelize.define('Company', {
    company_name: Sequelize.STRING,
    company_location: Sequelize.STRING,
    company_url: Sequelize.STRING
  });
}
