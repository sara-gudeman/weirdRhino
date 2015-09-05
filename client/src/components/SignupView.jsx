var UsernameInput = require('./UsernameInput');
var PasswordInput = require('./PasswordInput');
var AuthSubmitButton = require('./AuthSubmitButton');


var SignupView = React.createClass({

  // set initial credentials to empty strings
  getInitialState: function() {
    return {
      username: '',
      password: '',
      confirmPassword: ''
    }
  },

  changeUsername: function(text) {
    this.state.username = text;
  },

  changePassword: function(text) {
    this.state.password = text;
  },

  changeConfirmPassword: function(text) {
    this.state.confirmPassword = text;
  },

  submitCredentials: function() {
    // do something with the credentials
    console.log('username: ', this.state.username);
    console.log('password: ', this.state.password);
    console.log('confirm password: ', this.state.confirmPassword);
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
            <AuthSubmitButton submit={this.submitCredentials} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = SignupView;
