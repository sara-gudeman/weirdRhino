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

// create product status info w/initial values
var _submitProductStatus = {
  loading: null,
  error: null,
  productInfo: null
};

var _getProductInfo = function(query) {
  $.ajax({
    url: 'api/products/' + '?' + query,
    type: 'PUT',
    dataType: 'json',
    data: {
      queryString: query
    },
    success: function(data) {
      console.log('sending ajax request from _getProductInfo with data ', data);
      _productInfo = data;
      ProductStore.emitChange();
    },
    error: function(xhr, status, errorThrown) {
      throw new Error('Error in TechnologyStore. Error information: ' + xhr + ' ' + status + ' ' + errorThrown);
    }
  });
};

var _userSubmitProduct = function(userInput) {
  $.ajax({
    url: 'api/products/add',
    type: 'POST',
    data: {
      site: userInput
    },
    dataType: 'json',
    success: function(data) {
      _submitProductStatus.error = false;
      _submitProductStatus.productInfo = data;
    },
    error: function(xhr, status, errorThrown) {
      _submitProductStatus.error = true;
      // throw new Error('Error in AddProductModule. Error information: ' + xhr + ' ' + status + ' ' + errorThrown);
    },
    complete: function() {
      _submitProductStatus.loading = false;
      ProductStore.emitChange();
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
  },
  getProductStatus: function() {
    return _submitProductStatus;
  }
});

ProductStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.PRODUCT_QUERY:
      _getProductInfo(action.queryString);
      break;
    case ActionTypes.USER_SUBMIT_PRODUCT:
      _userSubmitProduct(action.site);
      break;

    // no default
  }
});

module.exports = ProductStore;

