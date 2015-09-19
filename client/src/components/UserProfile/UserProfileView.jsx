var React = require('react/addons');
var Router = require('react-router');
var $ = require('jquery');

var TechList = require('../sharedComponents/TechList');
var ProductList = require('../sharedComponents/ProductList');
var AddTechButton = require('./AddTechButton');
var RemoveTechButton = require('./RemoveTechButton');
var AddTechModal = require('./AddTechModal');
var GithubHandle = require('./GithubHandle');

var UserStore = require('../../stores/UserStore');
var UserActionCreators = require('../../actions/UserActionCreators');

var UserProfileView = React.createClass({

  // for redirecting user
  mixins: [Router.Navigation],

  getInitialState: function(){
    return {
      username: '',
      userTech: [],
      githubHandle: '',
      productsFollowing: [],
      handleUserTechClick: function() {},
      userIsRemovingTech: false
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
      githubHandle: userInfo.githubHandle,
      productsFollowing: userInfo.productsFollowing
    });
  },

  handleLogoutClick: function() {
    UserActionCreators.userLogout();
    // send user to login when logged out
    this.transitionTo('login');
  },

  removeUserTechItem: function(techName) {
    // remove the technology from the user
    UserActionCreators.userRemoveTechnology(techName);
  },
  handleRemoveTechClick: function() {
    // toggle className for tech
    $('.user-tech-item').toggleClass('btn-danger');
    // toggle function passed to user techList
    if(this.state.userIsRemovingTech) {
      this.setState({handleUserTechClick: function() {}});
    } else {
      this.setState({handleUserTechClick: this.removeUserTechItem});
    }
    this.setState({userIsRemovingTech: !this.state.userIsRemovingTech});
  },

  submitGithubHandle: function() {
    var handle = 'https://github.com/' + $('#user-github-handle').val();
    UserActionCreators.userAddGithubHandle(this.state.username, handle);
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
      <TechList techs={this.state.userTech}
        handleTechClick={this.state.handleUserTechClick}
        techItemClassName='user-tech-item' />
    );

    var prodList = (
      <ProductList list={this.state.productsFollowing}/>
    );

    var noneYet = (
      <p className="text-muted">none yet</p>
    );

    return (
      <div>
        <h1 className="user-profile-username">{this.state.username}</h1>
        <a onClick={this.handleLogoutClick} className="pointer">Log Out</a>

        <br />
        <br />

        <GithubHandle githubHandle={this.state.githubHandle} handleSubmit={this.submitGithubHandle} />

        <h3>Technologies</h3>
        {(this.state.userTech.length === 0) ? noneYet : techList}
        {this.state.userIsRemovingTech ? null : <AddTechButton />}

        <RemoveTechButton buttonName={this.state.userIsRemovingTech ? 'done' : 'remove tech'}
          handleClick={this.handleRemoveTechClick} />

        <br />
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
