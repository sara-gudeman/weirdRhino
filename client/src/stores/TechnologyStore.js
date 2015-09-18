/*eslint indent: [2, 2, {"SwitchCase": 1}]*/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

// internal storage
// functions that update internal storage
// register callbacks w/dispatcher

var _techSearchResults = {};

// search tech by tech name
var _getTechSearchResults = function(searchString) {
  $.ajax({
    url: 'api/technologies/searchbyname?searchString=' + searchString,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      _techSearchResults = data;
      TechnologyStore.emitChange();
    },
    error: function(xhr, status, errorThrown) {
      throw new Error('Error in TechnologyStore. Error information: ' + xhr + ' ' + status + ' ' + errorThrown);
    }
  });
};

// all setter functions exist outside of exported interface
// get results
// -- query api
// -- set searchResults to API query

var TechnologyStore = assign({}, EventEmitter.prototype, {
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
    return _techSearchResults;
  }
});


TechnologyStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.TECH_SEARCH:
      _getTechSearchResults(action.searchString);
      break;
  }
});

module.exports = TechnologyStore;
