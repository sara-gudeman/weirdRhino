var UserController = require('./userController');

module.exports = function(route) {
  route.post('/login', UserController.login);
  route.post('/signup', UserController.signup);
  route.get('/:username', UserController.getUser);
};
