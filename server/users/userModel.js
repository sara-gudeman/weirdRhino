module.exports = function(sequelize, Sequelize) {
  return sequelize.define('User', {
    username: Sequelize.STRING,
    hashed_password: Sequelize.STRING,
    token: Sequelize.STRING
  });
}
