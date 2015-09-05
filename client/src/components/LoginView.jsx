var UsernameInput = require('./UsernameInput');
var PasswordInput = require('./PasswordInput');
var AuthSubmitButton = require('./AuthSubmitButton');


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

  submitCredentials: function() {
    // do something with the credentials
    console.log('username: ', this.state.username);
    console.log('password: ', this.state.password);
    $.ajax({
      url: 'api/auth/login',
      type: 'POST',
      data: {
        username: this.state.username,
        password: this.state.password
      },
      dataType: 'json',
      success: function(data) {
        console.log('request success: ------>', data);
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
            <h3>Log In</h3>
            <UsernameInput changeUsername={this.changeUsername} placeholder='Username'/>
            <PasswordInput changePassword={this.changePassword} placeholder='Password'/>
            <AuthSubmitButton submit={this.submitCredentials} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = LoginView;
