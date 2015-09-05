var React = window.React = require('react');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var SearchActionCreators = require('../actions/SearchActionCreators');
var SearchStore = require('../stores/SearchStore');
var ProductStore = require('../stores/ProductStore');

var NavBar = require('./NavBar');
var NavButton = require('./NavButton');

var SearchView = require('./Search/SearchView');
var ProductView = require('./ProductProfile/ProductProfileView');
var DummyView = require('./DummyView');
var LoginView = require('./Login/LoginView');
var SignupView = require('./Signup/SignupView');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var Link = Router.Link;


var AppContainer = React.createClass({

  render: function() {
    return (
      <div>
        <h1>Stack Match</h1>
        <NavBar />
        <RouteHandler />
      </div>
    );
  }

});


var routes = (
  <Route name='app' path='/' handler={AppContainer}>
    <Route name='search' handler={SearchView}/>
    <Route name='dummy' handler={DummyView}/>
    <Route name='login' handler={LoginView}/>
    <Route name='signup' handler={SignupView}/>
    <Route name='product' handler={ProductView}/>
    <DefaultRoute name='default' handler={SearchView}/>
  </Route>
);

Router.run(routes, function(Handler){
  React.render(<Handler />, document.getElementById('app'));
});

module.exports = AppContainer;
