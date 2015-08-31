var AppContainer = React.createClass({

  //Dummy Tech Company Data
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

React.render(<AppContainer />, document.getElementById('app'));

module.exports = AppContainer;