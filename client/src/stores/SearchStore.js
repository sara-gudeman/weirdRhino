var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

// internal storage
// functions that update internal storage
// register callbacks w/dispatcher

var _searchResults = {};

// searching tech for MVP
var _getSearchResults = function(searchInfo) {
  // get request to api/products
  $.ajax({
    url: 'api/' + searchInfo['searchMode'],
    type: 'POST',
    dataType: 'json',
    data: {
      'searchString': searchInfo['text']
    },
    success: function(data) {
      // console.log('data', data);
      _searchResults = data;
      SearchStore.emitChange();
    },
    error: function(xhr, status, errorThrown) {
      console.log('error', errorThrown, ' status ', status);
      throw new Error(errorThrown);
    }
  });
};

// all setter functions exist outside of exported interface
// get results
// -- query api
// -- set searchResults to API query

var SearchStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  get: function() {
    return _searchResults;
  }
});

// does this execute _getSearchResults() whenever there is a search change?
SearchStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.SUBMIT_SEARCH:
      _getSearchResults(action.searchInfo);
      break;
  }
});

module.exports = SearchStore;
