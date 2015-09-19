var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

var UserActions = {

  submitUserCredentials: function(user_info) {
    AppDispatcher.dispatch({
      type: ActionTypes.USER_CREDENTIALS,
      user_info: user_info
    });
  },

  userLogout: function() {
    AppDispatcher.dispatch({
      type: ActionTypes.USER_LOGOUT
    });
  },

  userProductFollows: function(product_name) {
    AppDispatcher.dispatch({
      type: ActionTypes.FOLLOW_PRODUCTS,
      product_name: product_name
    });
  },

  userAddTechnology: function(technology_name) {
    AppDispatcher.dispatch({
      type: ActionTypes.USER_ADD_TECHNOLOGY,
      technology_name: technology_name
    });
  },

  userRemoveTechnology: function(technology_name) {
    AppDispatcher.dispatch({
      type: ActionTypes.USER_REMOVE_TECHNOLOGY,
      technology_name: technology_name
    });
  },

  userAddGithubHandle: function(username, github_handle) {
    AppDispatcher.dispatch({
      type: ActionTypes.USER_ADD_GITHUB,
      username: username,
      github_handle: github_handle
    });
  }

};

module.exports = UserActions;
