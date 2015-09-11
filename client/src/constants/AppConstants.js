var keyMirror = require('keymirror');

var AppConstants = {
  ActionTypes: keyMirror({
    SUBMIT_SEARCH: null,
    // PRODUCT_QUERY: null,
    USER_LOGIN: null,
    USER_SIGNUP: null,
    USER_LOGOUT: null,
    FOLLOW_PRODUCTS: null,
    TECH_SEARCH: null
  })
};

module.exports = AppConstants;
