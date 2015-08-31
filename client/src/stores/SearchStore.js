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
var _updateSearchResults = function(searchString) {
  // get request to api/products
  console.log('Hey I\'m in update search results');
  console.log(searchString);
};

// all setter functions exist outside of exported interface
// get results
// -- query api
// -- set searchResults to API query

var SearchStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  }
});

// ?
SearchStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.SUBMIT_SEARCH:
      _updateSearchResults(action.text);
      SearchStore.emitChange();
      break;
  }
});

module.exports = SearchStore;
