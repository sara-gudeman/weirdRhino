var React = require('react/addons');

var MainSearchBar = require('./MainSearchBar');
var ProductList = require('../sharedComponents/ProductList');
var SearchStore = require('../../stores/SearchStore');


var SearchView = React.createClass({

  // set initial search results to an empty array
  getInitialState: function() {
    return {
      searchResults: [],
      resultPage: 1,
    }
  },

  getSearchStoreState: function() {
    console.log(SearchStore.get());
    return SearchStore.get();
  },

  handleLoadMoreClick: function() {
    // do something with the search store here
    this.setState({resultPage: this.state.resultPage + 1});
    console.log(this.state.resultPage);
  },

  // Add change listeners
  componentDidMount: function() {
    SearchStore.addChangeListener(this._onChange);
  },
  // Remove change listeners
  componentWillUnmount: function() {
    SearchStore.removeChangeListener(this._onChange);
  },

  // Update state when store changes - triggers re-render
  _onChange: function() {
    this.setState({searchResults: this.getSearchStoreState()});
  },

  render: function() {

    var loadMoreButton = (
      <button onClick={this.handleLoadMoreClick}
        type="button"
        className="btn btn-sm btn-primary">
          load more
      </button>
    );

    return (
      <div>
        <MainSearchBar resultPage={this.state.resultPage} />
        <div className="main-search-results">
          <ProductList list={this.state.searchResults} />
        </div>
        <div className="text-center">
          {this.state.resultPage > 0 ? loadMoreButton : null}
        </div>
      </div>
    );
  }

});

module.exports = SearchView;

