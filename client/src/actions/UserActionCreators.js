var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

var UserActions = {
  submitCredentials: function(credentials) {
    console.log('dispatching submitCredentials from UserActionCreators with credentials: ', credentials);
    AppDispatcher.dispatch({
      type: ActionTypes.USER_AUTH,
      credentials: credentials
    });
  }
};

module.exports = UserActions;
