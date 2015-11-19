var React = require('react/addons');
var NavButton = require('./NavButton');
var AddProductButton = require('./AddProduct/AddProductButton');

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
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Stack Match</a>
          </div>
          <div className="navbar-collapse collapse" id="navbar">
            <ul className="nav navbar-nav">
              <AddProductButton />
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {this.props.userIsLogged ? userProfileButton : loginButton}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = NavBar;
