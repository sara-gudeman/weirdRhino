var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _productInfo = {};

var _getProductInfo = function(query) {
  $.ajax({
    url: 'api/products/' + query,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      // console.log('data', data);
      _productInfo = data;
      SearchStore.emitChange();
    },
    error: function(xhr, status, errorThrown) {
      console.log('error', errorThrown, ' status ', status);
    },
    complete: function(xhr, status) {
      // console.log('complete', status);
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
  }
});

module.exports = ProductStore;

