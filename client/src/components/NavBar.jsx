var React = require('react/addons');
var NavButton = require('./NavButton');


var NavBar = React.createClass({

  // set default logged status
  getDefaultProps: function() {
    return {
      userIsLogged: false
    };
  },

  render: function() {
    // define login and profile nav buttons here
    var loginButton = <NavButton navTo='login' label='Log In' />;
    var userProfileButton = <NavButton navTo='profile' label='Profile' />;

    return (
      <ul className="nav nav-pills">
        <NavButton navTo='search' label='Search' />
        {this.props.userIsLogged ? userProfileButton : loginButton}
      </ul>
    );
  }
});

module.exports = NavBar;
