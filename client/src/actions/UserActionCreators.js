var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

var UserActions = {

  submitLoginCredentials: function(credentials) {
    console.log('dispatching submitLoginCredentials from UserActionCreators with credentials: ', credentials);
    AppDispatcher.dispatch({
      type: ActionTypes.USER_LOGIN,
      credentials: credentials
    });
  },

  submitSignupCredentials: function(credentials) {
    console.log('dispatching submitSignupCredentials from UserActionCreators with credentials: ', credentials);
    AppDispatcher.dispatch({
      type: ActionTypes.USER_SIGNUP,
      credentials: credentials
    });
  },

  userLogout: function(credentials) {
    console.log('dispatching userLogout from UserActionCreators...');
    AppDispatcher.dispatch({
      type: ActionTypes.USER_LOGOUT
    });
  },

  userProductFollows: function(product_name) {
    console.log('dispatching from userProductFollows from UserActionCreators');
    AppDispatcher.dispatch({
      type: ActionTypes.FOLLOW_PRODUCTS,
      product_name: product_name
    });
  },

  userAddTechnology: function(technology_name) {
    console.log('dispatching from userAddTechnology from UserActionCreators');
    AppDispatcher.dispatch({
      type: ActionTypes.USER_ADD_TECHNOLOGY,
      technology_name: technology_name
    });
  },

  userRemoveTechnology: function(technology_name) {
    console.log('dispatching from userRemoveTechnology from UserActionCreators');
    AppDispatcher.dispatch({
      type: ActionTypes.USER_REMOVE_TECHNOLOGY,
      technology_name: technology_name
    });
  }

};

module.exports = UserActions;
