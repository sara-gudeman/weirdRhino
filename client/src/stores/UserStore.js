/*eslint indent: [2, 2, {"SwitchCase": 1}]*/

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('underscore');
var $ = require('jquery');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';


var _userInfo;

// initialize the user info
var init_userInfo = function() {
  _userInfo = {
    username: '',
    userTech: [],
    githubHandle: '',
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
      _userInfo.username = data.username;
      _userInfo.userTech = data.Technologies || [];
      _userInfo.productsFollowing = data.Products || [];
      UserStore.emitChange();
    },
    error: function(xhr, status, errorThrown) {
      throw new Error('Error in UserStore. Error information: ' + xhr + ' ' + status + ' ' + errorThrown);
    }
  });
};

var _removeTechnology = function(technology) {
  $.ajax({
    url: 'api/users/removetech',
    type: 'POST',
    data: {
      username: _userInfo.username,
      technology_name: technology
    },
    dataType: 'json',
    success: function(data) {
      _userInfo.username = data.username;
      _userInfo.userTech = data.Technologies || [];
      _userInfo.productsFollowing = data.Products || [];
      UserStore.emitChange();
    },
    error: function(xhr, status, errorThrown) {
      throw new Error('Error in UserStore. Error information: ' + xhr + ' ' + status + ' ' + errorThrown);
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
      UserStore.emitChange();
    },
    error: function(xhr, status, errorThrown) {
      throw new Error('Error in UserStore. Error information: ' + xhr + ' ' + status + ' ' + errorThrown);
    }
  });
};


// auth user on pageload if they have a token
var _authUserWithToken = function() {
  var username = window.localStorage.getItem('com.StackMatch.username');
  var token = window.localStorage.getItem('com.StackMatch');
  // make auth request to server with credentials
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
        // set user token and username in local storage
        window.localStorage.setItem('com.StackMatch', data.token);
        window.localStorage.setItem('com.StackMatch.username', data.username);
        // set user information
        _userInfo.username = data.username;
        _userInfo.userTech = data.Technologies || [];
        _userInfo.productsFollowing = data.Products || [];
        _userInfo.githubHandle = data.github_handle;
        _userInfo.isAuthenticated = true;
        // fire emitChange
        UserStore.emitChange();
      },
      error: function(xhr, status, errorThrown) {
        throw new Error('Error in UserStore. Error information: ' + xhr + ' ' + status + ' ' + errorThrown);
      }
    });
  }
};
_authUserWithToken();


var _submitUserCredentials = function(userInfo) {
  $.ajax({
    url: 'api/users/' + userInfo.userAction,
    type: 'POST',
    data: {
      username: userInfo.credentials.username,
      password: userInfo.credentials.password
    },
    dataType: 'json',
    success: function(data) {
      // set user token and username in local storage
      window.localStorage.setItem('com.StackMatch', data.token);
      window.localStorage.setItem('com.StackMatch.username', data.username);
      // set user information
      _userInfo.username = data.username;
      _userInfo.userTech = data.Technologies || [];
      _userInfo.productsFollowing = data.Products || [];
      _userInfo.githubHandle = data.github_handle;
      _userInfo.isAuthenticated = true;
      // fire emitChange
      UserStore.emitChange();
    },
    error: function(xhr, status, errorThrown) {
      throw new Error('Error in UserStore. Error information: ' + xhr + ' ' + status + ' ' + errorThrown);
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

var _addGithubHandle = function(username, github_handle) {
  var token = window.localStorage.getItem('com.StackMatch');
  $.ajax({
    url: 'api/users/githubhandle',
    type: 'POST',
    data: {
      username: username,
      githubHandle: github_handle,
      token: token
    },
    dataType: 'json',
    success: function() {
      _userInfo.githubHandle = github_handle;
      UserStore.emitChange();
    },
    error: function(xhr, status, errorThrown) {
      throw new Error('Error in UserStore. Error information: ' + xhr + ' ' + status + ' ' + errorThrown);
    }
  });

  _userInfo.githubHandle = github_handle;
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
    case ActionTypes.USER_CREDENTIALS:
      _submitUserCredentials(action.user_info);
    case ActionTypes.USER_LOGOUT:
      _userLogout();
      break;
    case ActionTypes.FOLLOW_PRODUCTS:
      _followProducts(action.product_name);
      break;
    case ActionTypes.USER_ADD_TECHNOLOGY:
      _addTechnology(action.technology_name);
      break;
    case ActionTypes.USER_REMOVE_TECHNOLOGY:
      _removeTechnology(action.technology_name);
      break;
    case ActionTypes.USER_ADD_GITHUB:
      _addGithubHandle(action.username, action.github_handle);
  }
});

module.exports = UserStore;
