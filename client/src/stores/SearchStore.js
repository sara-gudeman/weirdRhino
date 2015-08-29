var AppDispatcher = require('AppDispatcher');
var AppConstants = require('AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

// internal storage
// functions that update internal storage
// register callbacks w/dispatcher

var _searchResults = {};

var SearchStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  }
});

SearchStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.SUBMIT_SEARCH:
      SearchStore.emitChange();
      break;
  }
});

module.exports = SearchStore;

