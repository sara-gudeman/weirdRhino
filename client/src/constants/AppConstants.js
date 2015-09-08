var keyMirror = require('keymirror');

var AppConstants = {
  ActionTypes: keyMirror({
    SUBMIT_SEARCH: null,
    // PRODUCT_QUERY: null,
    USER_LOGIN: null,
    USER_SIGNUP: null,
    USER_LOGOUT: null
  })
};

module.exports = AppConstants;
