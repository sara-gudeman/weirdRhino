var React = window.React = require('react');
// stores
var UserStore = require('../stores/UserStore');
// header and nav
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

var AddProductModal = require('./AddProduct/AddProductModal');

var AppContainer = React.createClass({

  // for getting current url
  mixins: [Router.State],

  // set initial userLogged state
  getInitialState: function() {
    return {
      userIsLogged: false
    };
  },

  getUserStoreState: function() {
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

    // do not show searchColorBlock unless on searchView
    var searchColorBlock = <div className="search-page-color-block"></div>;

    return (
      <div>
        {(this.getPath() === '/' || this.getPath() === '/search') ? searchColorBlock : null}
        <div className="app-container">
          <NavBar userIsLogged={this.state.userIsLogged} />

          <div className="col-md-6 col-md-offset-3">

            <RouteHandler userState={this.getUserStoreState()}/>

            <AddProductModal />
          </div>

        </div>
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
