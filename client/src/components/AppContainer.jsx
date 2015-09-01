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

  // Add change listeners
  componentDidMount: function() {
    SearchStore.addChangeListener(this._onChange);
  },

  // Remove change listeners
  componentWillUnmount: function() {
    SearchStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <NavBar />
        <MainSearchBar />
        <ResultList list={this.state.searchResults.results} />
      </div>
    );
  },

  // Update state when store changes - triggers re-render
  _onChange: function() {
    this.setState({searchResults: getStateFromStores()});
  }
});

React.render(<AppContainer />, document.getElementById('app'));

module.exports = AppContainer;
