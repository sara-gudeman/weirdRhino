var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';


var _userInfo;

// initialize the user info
var init_userInfo = function() {
  _userInfo = {
    username: '',
    userTech: [],
    productsFollowing: [],
    isAuthenticated: false
  };
};
init_userInfo();

var _addTechnology = function(technology) {
  $.ajax({
    url: 'api/users/addtech',
    type: 'POST',
    data: {
      username: _userInfo.username,
      technology_name: technology
    },
    dataType: 'json',
    success: function(data) {
      console.log('data returned from add technology: ', data);
      _userInfo.username = data.username;
      _userInfo.userTech = data.Technologies || [];
      _userInfo.productsFollowing = data.Products || [];
      UserStore.emitChange();
    },
    error: function(xhr, status, errorThrown) {
      console.log('error ', errorThrown, ' status ', status)
    },
    complete: function(xhr, status) {
      console.log('complete ', status)
    }
  });
};

var _followProducts = function(product) {
  var userIsFollowing;
  // determine if user is already following product
  _.each(_userInfo.productsFollowing, function(productObj) {
    if (productObj.product_name === product) {
      userIsFollowing = true;
    }
  });
  $.ajax({
    url: 'api/users/followproduct',
    type: 'POST',
    data: {
      username: _userInfo.username,
      product_name: product,
      isFollowing: userIsFollowing
    },
    dataType: 'json',
    success: function(data) {
      _userInfo.username = data.username;
      _userInfo.userTech = data.Technologies || [];
      _userInfo.productsFollowing = data.Products || [];
      console.log('data returned from follow products ', data);
      UserStore.emitChange();
    },
    error: function(xhr, status, errorThrown) {
      console.log('error ', errorThrown, ' status ', status)
    },
    complete: function(xhr, status) {
      console.log('complete ', status)
    }
  });
};


// auth user on pageload if they have a token
var _authUserWithToken = function() {
  var username = window.localStorage.getItem('com.StackMatch.username');
  var token = window.localStorage.getItem('com.StackMatch');
  // make auth request to server with credentials
  console.log('requesting authorization from server...');
  console.log('username: ', username);
  console.log('token: ', token);

  if(username && token) {
    $.ajax({
      url: 'api/users/username',
      type: 'POST',
      data: {
        username: username,
        token: token
      },
      dataType: 'json',
      success: function(data) {
        console.log('login request success: ------>', data);
        console.log('data.Products: ---------------->', data.Products);
        // set user token and username in local storage
        window.localStorage.setItem('com.StackMatch', data.token);
        window.localStorage.setItem('com.StackMatch.username', data.username);
        // set user information
        _userInfo.username = data.username;
        _userInfo.userTech = data.Technologies || [];
        _userInfo.productsFollowing = data.Products || [];
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
  }
};
_authUserWithToken();


// user login
var _submitLoginCredentials = function(credentials) {
  // make auth request to server with credentials
  console.log('requesting authorization from server...');
  console.log('username: ', credentials.username);
  console.log('password: ', credentials.password);

  $.ajax({
    url: 'api/users/login',
    type: 'POST',
    data: {
      username: credentials.username,
      password: credentials.password
    },
    dataType: 'json',
    success: function(data) {
      console.log('login request success: ------>', data);
      // set user token and username in local storage
      window.localStorage.setItem('com.StackMatch', data.token);
      window.localStorage.setItem('com.StackMatch.username', data.username);
      // set user information
      _userInfo.username = data.username;
      _userInfo.userTech = data.Technologies || [];
      _userInfo.productsFollowing = data.Products || [];
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
    url: 'api/users/signup',
    type: 'POST',
    data: {
      username: credentials.username,
      password: credentials.password
    },
    dataType: 'json',
    success: function(data) {
      console.log('login request success: ------>', data);
      // set user token and username in local storage
      window.localStorage.setItem('com.StackMatch', data.token);
      window.localStorage.setItem('com.StackMatch.username', data.username);
      // set user information
      _userInfo.username = data.username;
      _userInfo.userTech = data.Technologies || [];
      _userInfo.productsFollowing = data.Products || [];
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

// user logout
var _userLogout = function() {
  // reset user info
  init_userInfo();
  // set user token to null
  window.localStorage.removeItem('com.StackMatch');
  window.localStorage.removeItem('com.StackMatch.username');
  // fire emitChange
  UserStore.emitChange();
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
    case ActionTypes.USER_LOGOUT:
      _userLogout();
      break;
    case ActionTypes.FOLLOW_PRODUCTS:
      _followProducts(action.product_name);
      break;
    case ActionTypes.ADD_TECHNOLOGY:
      _addTechnology(action.technology_name);
      break;
  }
});

module.exports = UserStore;
