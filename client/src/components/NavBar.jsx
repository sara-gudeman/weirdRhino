var NavBar = React.createClass({

  getDefaultProps: function() {
    return {
      navLinks: [{
        label: 'Search',
        url: 'whatever.com'
      },
      {
        label: 'Trending',
        url: 'whatever.com'
      },
      {
        label: 'Profile',
        url: 'whatever.com'
      },
      {
        label: 'Login',
        url: 'whatever.com'
      }]
    };
  },

  render: function() {
    var navButtons = this.props.navLinks.map(function(link, index) {
      return (
        <NavButton key={index}
          url={link.url}
          label={link.label} />
      );
    });
    return (
      <nav>
        <ul>
          {navButtons}
        </ul>
      </nav>
    );
  }
});
