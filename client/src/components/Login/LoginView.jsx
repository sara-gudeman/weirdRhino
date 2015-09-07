var React = require('react/addons');

var UsernameInput = require('../sharedComponents/UsernameInput');
var PasswordInput = require('../sharedComponents/PasswordInput');
var AuthSubmitButton = require('../sharedComponents/AuthSubmitButton');

var UserStore = require('../../stores/UserStore');
var UserActionCreators = require('../../actions/UserActionCreators');

var Router = require('react-router');
var Link = Router.Link;


var LoginView = React.createClass({

  // set initial credentials to empty strings
  getInitialState: function() {
    return {
      username: '',
      password: ''
    }
  },

  changeUsername: function(text) {
    this.state.username = text;
  },

  changePassword: function(text) {
    this.state.password = text;
  },

  // flux way of handling user auth and saving user info
  handleSubmit: function() {
    var credentials = {
      username: this.state.username,
      password: this.state.password
    };
    UserActionCreators.submitLoginCredentials(credentials);
  },

  render: function() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-4 login-margin'>
            <h3>Log In</h3>
            <UsernameInput changeUsername={this.changeUsername} placeholder='Username'/>
            <PasswordInput changePassword={this.changePassword} placeholder='Password'/>
            <AuthSubmitButton submit={this.handleSubmit} />
            <br />
            Need new account?
            <br />
            <Link to='signup'>Sign Up</Link>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = LoginView;
