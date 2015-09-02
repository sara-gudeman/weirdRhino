//this is just a sample jsx file for reference
//it does nothing real

var MainContainer = React.createClass({

  getDefaultProps: function() {
    return {
      companies: [
        {
          name: 'Google',
          techList: ['jQuery', 'node'],
          url: 'google.com'
        },
        {
          name: 'Facebook',
          techList: ['React', 'Flux'],
          url: 'facebook.com'
        },
        {
          name: 'Walmart',
          techList: ['evil', 'poverty', 'soulcrushing'],
          url: 'walmart.com'
        },
        {
          name: 'Yelp',
          techList: ['Angular', 'Ruby'],
          url: 'yelp.com'
        },
        {
          name: 'Hack Reactor',
          techList: ['Koolaid', 'Love', 'Baby\'s Tears'],
          url: 'hackreactor.com'
        }
      ]
    }
  },

  getInitialState: function() {
    return {
      currentCompanies: []
    }
  },

  filterCompanies: function(searchString) {
    var results = [];
    for(var i = 0; i < this.props.companies.length; i++) {
      if(this.props.companies[i].name.indexOf(searchString) > -1 || searchString === '') {
        results.push(this.props.companies[i]);
      }
    }
    this.setState({
      currentCompanies: results
    });
  },

  componentDidMount: function() {
    this.filterCompanies('');
  },

  render: function() {
    return (
      <div>
        <NavBar />
        <MainSearchBar filter={this.filterCompanies} />
        <ResultList list={this.state.currentCompanies} />
      </div>
    );
  }
});

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

var NavButton = React.createClass({
  render: function() {
    return (
      <div>
        <li>
          <a href={this.props.url}>{this.props.label}</a>
        </li>
      </div>
    );
  }
});

var MainSearchBar = React.createClass({

  handleSearchChange: function(e) {
    this.props.filter(e.target.value);
  },

  render: function() {
    return (
      <div>
        <input type="search"
          placeholder="Enter company"
          onChange={this.handleSearchChange} />
      </div>
    );
  }
});

var ResultList = React.createClass({
  render: function() {
    var resultList = this.props.list.map(function(company, index) {
      return (
        <ResultItem key={index}
          name={company.name}
          techList={company.techList}
          url={company.url} />
      );
    });
    return (
      <div>
        {resultList}
      </div>
    );
  }
});

var ResultItem = React.createClass({

  handleResultClick: function() {
    console.log('list item clicked');
  },

  render: function() {
    var techs = this.props.techList.map(function(tech) {
      return tech + ' ';
    });
    return (
      <div className="result-item" onClick={this.handleResultClick}>
        <h3>{this.props.name}</h3>
        <p>{techs}</p>
      </div>
    );
  }
});


React.render(<MainContainer />, document.getElementById('app'));






