var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

var SearchActions = {
  submitSearch: function(text) {
    console.log('dispatching submitSearch from SearchActionCreators with text: ', text);
    AppDispatcher.dispatch({
      type: ActionTypes.SUBMIT_SEARCH,
      text: text
    });
  }
};

module.exports = SearchActions;
