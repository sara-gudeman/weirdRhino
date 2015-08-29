var AppDispatcher = require('AppDispatcher');
var AppConstants = require('AppConstants');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {
  submitSearch: function(text) {
    AppDispatcher.dispatch({
      type: ActionTypes.SUBMIT_SEARCH,
      text: text
    })
  }
}