var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';


var _userInfo = {
  username: null,
  userTech: null,
  productsFollowing: null,
  isAuthenticated: false
};

// user login
var _submitLoginCredentials = function(credentials) {
  // make auth request to server with credentials
  console.log('requesting authorization from server...');
  console.log('username: ', credentials.username);
  console.log('password: ', credentials.password);

  $.ajax({
    url: 'api/auth/login',
    type: 'POST',
    data: {
      username: credentials.username,
      password: credentials.password
    },
    dataType: 'json',
    success: function(data) {
      //
      //  WILL DO MORE STUFF WITH THE USER LOGIN
      //
      console.log('login request success: ------>', data);
      // set user token
      window.localStorage.setItem('com.StackMatch', data.token);
      console.log('token: ', window.localStorage.getItem('com.StackMatch'));
      // set user information
      _userInfo.username = data.username;
      _userInfo.userTech = data.userTech;
      _userInfo.productsFollowing = data.productsFollowing;
      _userInfo.isAuthenticated = true;
      // fire emitChange
      UserStore.emitChange();
      console.log('_userInfo changed: ---->', _userInfo);
    },
    error: function(xhr, status, errorThrown) {
      console.log('error', errorThrown, ' status ', status);
    },
    complete: function(xhr, status) {
      // console.log('complete', status);
    }
  });
};

// user signup
var _submitSignupCredentials = function(credentials) {
  // make auth request to server with credentials
  console.log('requesting authorization from server...');
  console.log('username: ', credentials.username);
  console.log('password: ', credentials.password);

  $.ajax({
    url: 'api/auth/signup',
    type: 'POST',
    data: {
      username: credentials.username,
      password: credentials.password
    },
    dataType: 'json',
    success: function(data) {
      //
      //  WILL DO MORE STUFF WITH THE USER SIGNUP
      //
      console.log('login request success: ------>', data);
      // set user token
      window.localStorage.setItem('com.StackMatch', data.token);
      console.log('token: ', window.localStorage.getItem('com.StackMatch'));
      // set user information
      _userInfo.username = data.username;
      _userInfo.userTech = data.userTech;
      _userInfo.productsFollowing = data.productsFollowing;
      _userInfo.isAuthenticated = true;
      // fire emitChange
      UserStore.emitChange();
      console.log('_userInfo changed: ---->', _userInfo);
    },
    error: function(xhr, status, errorThrown) {
      console.log('error', errorThrown, ' status ', status);
    },
    complete: function(xhr, status) {
      // console.log('complete', status);
    }
  });
};


var UserStore = assign({}, EventEmitter.prototype, {
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
    return _userInfo;
  }
});


UserStore.dispatchToken = AppDispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.USER_LOGIN:
      _submitLoginCredentials(action.credentials);
      break;
  case ActionTypes.USER_SIGNUP:
      _submitSignupCredentials(action.credentials);
      break;
  }
});

module.exports = UserStore;
