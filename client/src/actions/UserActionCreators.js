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
  }

};

module.exports = UserActions;
