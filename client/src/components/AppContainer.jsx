var React = window.React = require('react');
// flux thangs
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var SearchActionCreators = require('../actions/SearchActionCreators');
// stores
var SearchStore = require('../stores/SearchStore');
var UserStore = require('../stores/UserStore');
// header and nav
var AppHeaderText = require('./AppHeaderText');
var NavBar = require('./NavBar');
// views
var SearchView = require('./Search/SearchView');
var ProductView = require('./ProductProfile/ProductProfileView');
var UserProfileView = require('./UserProfile/UserProfileView');
var LoginView = require('./Login/LoginView');
var SignupView = require('./Signup/SignupView');
// router
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var Link = Router.Link;

var AddProductModal = require('./AddProductModal');

var AppContainer = React.createClass({

  // for getting current url
  mixins: [Router.State],

  // set initial userLogged state
  getInitialState: function() {
    return {
      userIsLogged: false
    }
  },

  getUserStoreState: function() {
    console.log(UserStore.get());
    return UserStore.get();
  },

  //check for user's token when they first hit the page and change userIsLogged state accordingly
  componentWillMount: function() {
    this.setState({userIsLogged: this.getUserStoreState().isAuthenticated});
  },

  // Add change listeners
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  // Remove change listeners
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  render: function() {

    // do not show navBar if on login or signup
    var navBar = (<NavBar userIsLogged={this.state.userIsLogged} />);

    return (
      <div className="app-container">
        <AppHeaderText />
        {(this.getPath() === '/signup' || this.getPath() === '/login') ? null : navBar}

        <RouteHandler userState={this.getUserStoreState()}/>
        
        <AddProductModal />
      </div>
    );
  },

  // Update state when store changes - triggers re-render
  _onChange: function() {
    this.setState({userIsLogged: this.getUserStoreState().isAuthenticated});
  }

});


var routes = (
  <Route name='app' path='/' handler={AppContainer}>
    <Route name='search' handler={SearchView}/>
    <Route name='login' handler={LoginView}/>
    <Route name='signup' handler={SignupView}/>
    <Route name='product' handler={ProductView}/>
    <Route name='profile' handler={UserProfileView}/>
    <DefaultRoute name='default' handler={SearchView}/>
  </Route>
);

Router.run(routes, function(Handler){
  React.render(<Handler />, document.getElementById('app'));
});

module.exports = AppContainer;
