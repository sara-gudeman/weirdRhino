var keyMirror = require('keymirror');

var AppConstants = {
  ActionTypes: keyMirror({
    SUBMIT_SEARCH: null,
    PRODUCT_QUERY: null,
    USER_AUTH: null
  })
};

module.exports = AppConstants;
