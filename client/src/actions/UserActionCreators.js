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
  }

};

module.exports = UserActions;
