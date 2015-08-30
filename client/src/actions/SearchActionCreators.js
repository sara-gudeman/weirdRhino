var AppDispatcher = require('AppDispatcher');
var AppConstants = require('AppConstants');

var ActionTypes = AppConstants.ActionTypes;

module.exports.SearchActionCreators = {
  submitSearch: function(text) {
    console.log('dispatching submitSearch from SearchActionCreators');
    AppDispatcher.dispatch({
      type: ActionTypes.SUBMIT_SEARCH,
      text: text
    })
  }
}