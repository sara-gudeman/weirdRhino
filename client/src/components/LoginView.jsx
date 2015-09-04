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
  },

  render: function() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-4 login-margin'>
            <h3>Log in</h3>
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
