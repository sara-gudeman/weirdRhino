var keyMirror = require('keymirror');

var AppConstants = {
  ActionTypes: keyMirror({
    SUBMIT_SEARCH: null,
    // PRODUCT_QUERY: null,
    USER_LOGIN: null,
    USER_SIGNUP: null,
    USER_LOGOUT: null,
    FOLLOW_PRODUCTS: null,
    USER_ADD_TECHNOLOGY: null,
    USER_REMOVE_TECHNOLOGY: null,
    TECH_SEARCH: null,
    USER_ADD_GITHUB: null
  })
};

module.exports = AppConstants;
