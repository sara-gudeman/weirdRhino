var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

var SearchActions = {
  submitSearch: function(searchInfo) {
    console.log('dispatching submitSearch from SearchActionCreators with text: ', searchInfo['text'], ' and searchMode ', searchInfo['searchMode']);
    AppDispatcher.dispatch({
      type: ActionTypes.SUBMIT_SEARCH,
      searchInfo: searchInfo
    });
  }
};

module.exports = SearchActions;
