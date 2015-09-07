var React = require('react/addons');

var MainSearchBar = require('./MainSearchBar');
var ResultList = require('./ResultList');
var SearchStore = require('../../stores/SearchStore');


var SearchView = React.createClass({
  // set initial search results to an empty array
  getInitialState: function() {
    return {
      searchResults: []
    }
  },

  getSearchStoreState: function() {
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
        <MainSearchBar />
        <ResultList list={this.state.searchResults} />
      </div>
    );
  },

  // Update state when store changes - triggers re-render
  _onChange: function() {
    this.setState({searchResults: this.getSearchStoreState()});
  }
});

module.exports = SearchView;

