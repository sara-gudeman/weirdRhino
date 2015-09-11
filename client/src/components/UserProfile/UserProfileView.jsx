var React = require('react/addons');

var TechList = require('../sharedComponents/TechList');
var ProductList = require('../sharedComponents/ProductList');
var AddTechButton = require('./AddTechButton');
var AddTechModal = require('./AddTechModal');

var UserStore = require('../../stores/UserStore');
var UserActionCreators = require('../../actions/UserActionCreators');

var Router = require('react-router');
var Link = Router.Link;


var UserProfileView = React.createClass({

  // for redirecting user
  mixins: [Router.Navigation],

  getInitialState: function(){
    return {
      username: "",
      userTech: [],
      productsFollowing: []
    };
  },

  getUserStoreState: function() {
    return UserStore.get();
  },

  setProfileState: function() {
    var userInfo = this.getUserStoreState();
    this.setState({
      username: userInfo.username,
      userTech: userInfo.userTech,
      productsFollowing: userInfo.productsFollowing
    });
  },

  handleLogoutClick: function() {
    UserActionCreators.userLogout();
    // send user to login when logged out
    this.transitionTo('login');
  },

  componentWillMount: function() {
    this.setProfileState();
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
    // show "none yet" if userTech is an empty array
    var techList = (
      <TechList techs={this.state.userTech} />
    );

    var prodList = (
      <ProductList products={this.state.productsFollowing} />
    );

    var noneYet = (
      <p className="text-muted">none yet</p>
    );

    return (
      <div>
        <h1>{this.state.username}</h1>
        <a onClick={this.handleLogoutClick} className="pointer">Log Out</a>
        <br />
        <br />
        <h3>Technologies</h3>
        {(this.state.userTech.length === 0) ? noneYet : techList}
        <AddTechButton />
        <br />
        <h3>Following</h3>
        {(this.state.productsFollowing.length === 0) ? noneYet : prodList}

        <AddTechModal />

      </div>
    );
  },

  // Update state when store changes - triggers re-render
  _onChange: function() {
    this.setProfileState();
  }

});

module.exports = UserProfileView;
