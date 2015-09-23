// THIS FILE IS CURRENTLY NOT USED TO KEEP TRACK OF PRODUCT INFORMATION
// IT IS HANDLED IN THE PRODUCT PROFILE VIEW ATM

/*eslint indent: [2, 2, {"SwitchCase": 1}]*/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');
var SearchStore = require('./SearchStore');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _productInfo = {};

var _getProductInfo = function(query) {
  $.ajax({
    url: 'api/products/' + query,
    type: 'PUT',
    dataType: 'json',
    success: function(data) {
      _productInfo = data;
      SearchStore.emitChange();
    },
    error: function(xhr, status, errorThrown) {
      throw new Error('Error in TechnologyStore. Error information: ' + xhr + ' ' + status + ' ' + errorThrown);
    }
  });
};

var ProductStore = assign({}, EventEmitter.prototype, {
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
    return _productInfo;
  }
});

ProductStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.PRODUCT_QUERY:
      _getProductInfo(action.text);
      break;

    // no default
  }
});

module.exports = ProductStore;

