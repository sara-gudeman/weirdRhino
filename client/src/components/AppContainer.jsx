var React = window.React = require('react');
// var AppContainer = require('./AppContainer');
var MainSearchBar = require('./MainSearchBar');
var NavBar = require('./NavBar');
var NavButton = require('./NavButton');
var ResultItem = require('./ResultItem');
var ResultList = require('./ResultList');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var SearchActionCreators = require('../actions/SearchActionCreators');
var SearchStore = require('../stores/SearchStore');

var getStateFromStores = function() {
  return {
    results: SearchStore.get()
  }
}

var AppContainer = React.createClass({

  //Dummy Tech Company Data
  // getDefaultProps: function() {
  //   return {
  //     companies: [
  //       {
  //         name: 'Google',
  //         techList: ['jQuery', 'node'],
  //         url: 'google.com'
  //       },
  //       {
  //         name: 'Facebook',
  //         techList: ['React', 'Flux'],
  //         url: 'facebook.com'
  //       },
  //       {
  //         name: 'Walmart',
  //         techList: ['evil', 'poverty', 'soulcrushing'],
  //         url: 'walmart.com'
  //       },
  //       {
  //         name: 'Yelp',
  //         techList: ['Angular', 'Ruby'],
  //         url: 'yelp.com'
  //       },
  //       {
  //         name: 'Hack Reactor',
  //         techList: ['Koolaid', 'Love', 'Baby\'s Tears'],
  //         url: 'hackreactor.com'
  //       }
  //     ]
  //   }
  // },

  getInitialState: function() {
    return {
      searchResults: {
        results: [
          {
            product_name: 'Google',
            product_technologies: ['jQuery', 'node'],
            url: 'google.com'
          },
          {
            product_name: 'Facebook',
            product_technologies: ['React', 'Flux'],
            url: 'facebook.com'
          },
          {
            product_name: 'Walmart',
            product_technologies: ['evil', 'poverty', 'soulcrushing'],
            url: 'walmart.com'
          },
          {
            product_name: 'Yelp',
            product_technologies: ['Angular', 'Ruby'],
            url: 'yelp.com'
          },
          {
            product_name: 'Hack Reactor',
            product_technologies: ['Koolaid', 'Love', 'Baby\'s Tears'],
            url: 'hackreactor.com'
          }
        ]
      }
    }
  },

  componentDidMount: function() {
    SearchStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    SearchStore.removeChangeListener(this._onChange);
  },

  // filterCompanies: function(searchString) {
  //   var results = [];
  //   for(var i = 0; i < this.props.companies.length; i++) {
  //     if(this.props.companies[i].name.indexOf(searchString) > -1 || searchString === '') {
  //       results.push(this.props.companies[i]);
  //     }
  //   }
  //   this.setState({
  //     currentCompanies: results
  //   });
  // },

  // componentDidMount: function() {
  //   this.filterCompanies('');
  // },

  render: function() {
    console.log('running AppContainer.render');
    return (
      <div>
        <NavBar />
        <MainSearchBar />
        <ResultList list={this.state.searchResults.results} />
      </div>
    );
  },

  _onChange: function() {
    console.log('in _onChange');
    this.setState({searchResults: getStateFromStores()});
    console.log('state', this.state);
    // this.setState(getStateFromStores());
  }
});

React.render(<AppContainer />, document.getElementById('app'));
console.log('ran react.render');

module.exports = AppContainer;
