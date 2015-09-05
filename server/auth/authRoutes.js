var AuthController = require('./authController');

module.exports = function(route) {
  route.post('/login', AuthController.userLogin);
  route.post('/signup', AuthController.userSignup);
};
