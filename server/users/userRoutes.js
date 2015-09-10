var UserController = require('./userController');

module.exports = function(route) {
  route.post('/login', UserController.login);
  route.post('/signup', UserController.signup);
  route.post('/username', UserController.getUser);
  route.post('/addtech', UserController.addTechToUser);
  route.post('/followproduct', UserController.addProductFollowToUser);
};
