var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

var ProductActions = {
  productQuery: function(queryString) {
    AppDispatcher.dispatch({
      type: ActionTypes.PRODUCT_QUERY,
      queryString: queryString
    });
  },
  submitProduct: function(userInput) {
    AppDispatcher.dispatch({
      type: ActionTypes.USER_SUBMIT_PRODUCT,
      site: userInput
    });
  }
};

module.exports = ProductActions;