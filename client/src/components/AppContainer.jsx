var React = window.React = require('react');
// var AppContainer = require('./AppContainer');
var MainSearchBar = require('./MainSearchBar');
var NavBar = require('./NavBar');
var NavButton = require('./NavButton');
var ResultItem = require('./ResultItem');
var ResultList = require('./ResultList');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var SearchActionCreators = require('../actions/SearchActionCreators');
var SearchStore = require('../stores/SearchStore');

var SearchView = require('./SearchView');
var DummyView = require('./DummyView');
var LoginView = require('./LoginView');

var ProductStore = require('../stores/ProductStore');
var TechItem = require('./TechItem');
var TechList = require('./TechList');
var ProductView = require('./ProductProfileView');

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
    <Route name='product' handler={ProductView}/>
    <DefaultRoute name='default' handler={SearchView}/>
  </Route>
);

Router.run(routes, function(Handler){
  React.render(<Handler />, document.getElementById('app'));
});

module.exports = AppContainer;
