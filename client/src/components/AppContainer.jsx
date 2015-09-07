var React = window.React = require('react');
// flux thangs
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var SearchActionCreators = require('../actions/SearchActionCreators');
// stores
var SearchStore = require('../stores/SearchStore');
var UserStore = require('../stores/UserStore');
// nav
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


var AppContainer = React.createClass({

  mixins: [ Router.State ],

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

  // Add change listeners
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  // Remove change listeners
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  //
  //need check for user's token when they first hit the page
  //and change userIsLogged state accordingly
  //

  render: function() {

    // do not show navBar if on login or signup
    var navBar = (<NavBar userIsLogged={this.state.userIsLogged} />);

    return (
      <div>
        <h1>Stack Match</h1>
        {(this.getPath() === '/signup' || this.getPath() === '/login') ? null : navBar}
        <RouteHandler />
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
