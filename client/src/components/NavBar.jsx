var NavBar = React.createClass({

  // temporary nav slots with "#" URLs
  getDefaultProps: function() {
    return {
      navLinks: [{
        label: 'Search',
        url: '#'
      },
      {
        label: 'Trending',
        url: '#'
      },
      {
        label: 'Profile',
        url: '#'
      },
      {
        label: 'Login',
        url: '#'
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
      <ul className="nav nav-pills">
        {navButtons}
      </ul>
    );
  }
});
