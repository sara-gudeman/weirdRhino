var UsernameInput = require('../sharedComponents/UsernameInput');
var PasswordInput = require('../sharedComponents/PasswordInput');
var AuthSubmitButton = require('../sharedComponents/AuthSubmitButton');


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

  submitCredentials: function() {
    // perhaps move all this logic to action and store using flux?
    // make auth request to server with credentials
    console.log('requesting authorization from server...');
    console.log('username: ', this.state.username);
    console.log('password: ', this.state.password);
    console.log('confirm password: ', this.state.confirmPassword);

    $.ajax({
      url: 'api/auth/signup',
      type: 'POST',
      data: {
        username: this.state.username,
        password: this.state.password
      },
      dataType: 'json',
      success: function(data) {
        console.log('signup request success: ------>', data);
      },
      error: function(xhr, status, errorThrown) {
        console.log('error', errorThrown, ' status ', status);
      },
      complete: function(xhr, status) {
        // console.log('complete', status);
      }
    });
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
              submit={this.submitCredentials}
              disabled={this.state.authButtonStatus} />

          </div>
        </div>
      </div>
    );
  }

});

module.exports = SignupView;
