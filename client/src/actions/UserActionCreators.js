var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

var UserActions = {

  submitLoginCredentials: function(credentials) {
    AppDispatcher.dispatch({
      type: ActionTypes.USER_LOGIN,
      credentials: credentials
    });
  },

  submitSignupCredentials: function(credentials) {
    AppDispatcher.dispatch({
      type: ActionTypes.USER_SIGNUP,
      credentials: credentials
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
