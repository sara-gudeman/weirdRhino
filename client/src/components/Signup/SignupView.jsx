var React = require('react/addons');

var UsernameInput = require('../sharedComponents/UsernameInput');
var PasswordInput = require('../sharedComponents/PasswordInput');
var AuthSubmitButton = require('../sharedComponents/AuthSubmitButton');

var UserStore = require('../../stores/UserStore');
var UserActionCreators = require('../../actions/UserActionCreators');


var SignupView = React.createClass({

  // set initial credentials to empty strings
  getInitialState: function() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      authButtonStatus: 'disabled'
    }
  },

  changeUsername: function(text) {
    this.state.username = text;
  },

  changePassword: function(text) {
    this.state.password = text;
    this.checkAuthButtonStatus();
  },

  changeConfirmPassword: function(text) {
    this.state.confirmPassword = text;
    this.checkAuthButtonStatus();
  },

  // ensure the password and confirmPassword are the same before submission
  checkAuthButtonStatus: function() {
    if(this.state.password === this.state.confirmPassword) {
      this.setState({authButtonStatus: ''});
    } else {
      this.setState({authButtonStatus: 'disabled'});
    }
  },

  // flux way of handling user auth and saving user info
  handleSubmit: function() {
    var credentials = {
      username: this.state.username,
      password: this.state.password
    };
    UserActionCreators.submitSignupCredentials(credentials);
  },

  render: function() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-4 login-margin'>
            <h3>Sign Up</h3>
            <UsernameInput changeUsername={this.changeUsername} placeholder='Username'/>
            <PasswordInput changePassword={this.changePassword} placeholder='Password'/>
            <PasswordInput changePassword={this.changeConfirmPassword} placeholder='Confirm Password'/>

            <AuthSubmitButton
              submit={this.handleSubmit}
              disabled={this.state.authButtonStatus} />

          </div>
        </div>
      </div>
    );
  }

});

module.exports = SignupView;
