var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

var TechnologyActions = {
  submitSearch: function(searchString) {
    AppDispatcher.dispatch({
      type: ActionTypes.TECH_SEARCH,
      searchString: searchString
    });
  }
};

module.exports = TechnologyActions;
