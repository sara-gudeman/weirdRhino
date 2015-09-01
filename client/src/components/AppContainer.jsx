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


var AppContainer = React.createClass({
  // set initial search results to an empty array
  getInitialState: function() {
    return {
      searchResults: []
    }
  },

  getStateFromStores: function() {
    console.log(SearchStore.get());
    return SearchStore.get();
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
        <ResultList list={this.state.searchResults} />
      </div>
    );
  },

  // Update state when store changes - triggers re-render
  _onChange: function() {
    this.setState({searchResults: this.getStateFromStores()});
  }
});

React.render(<AppContainer />, document.getElementById('app'));

module.exports = AppContainer;
