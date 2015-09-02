module.exports = function(sequelize, Sequelize) {
  var Company = sequelize.define('Company' {
    company_name: Sequelize.STRING,
    company_location: Sequelize.STRING,
    company_url: Sequelize.STRING
  });

  //Company.sync();
  return Company;
}
