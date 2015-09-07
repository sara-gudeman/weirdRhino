var React = require('react/addons');
var NavButton = require('./NavButton');
var NavBar = React.createClass({

  // temporary nav slots with "#" URLs
  getDefaultProps: function() {
    return {
      navLinks: [
        {
          label: 'Search',
          navTo: 'search'
        },
        // login and signup navs are temporary until we have real auth
        {
          label: 'Log In',
          navTo: 'login'
        },
        {
          label: 'Sign Up',
          navTo: 'signup'
        }
      ]
    };
  },

  render: function() {
    var navButtons = this.props.navLinks.map(function(link, index) {
      return (
        <NavButton key={index}
          navTo={link.navTo}
          label={link.label} />
      );
    });
    return (
      <ul className="nav nav-pills">
        {navButtons}
      </ul>
    );
  }
});

module.exports = NavBar;
