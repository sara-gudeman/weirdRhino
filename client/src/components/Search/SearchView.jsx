var React = require('react/addons');

var SearchActionCreators = require('../../actions/SearchActionCreators');

var AppHeaderText = require('../AppHeaderText');
var MainSearchBar = require('./MainSearchBar');
var SearchModeButton = require('./SearchModeButton');
var ProductList = require('../sharedComponents/ProductList');
var SearchStore = require('../../stores/SearchStore');


var SearchView = React.createClass({

  // set initial search results to an empty array
  getInitialState: function() {
    return {
      searchMode: 'technologies',
      searchResults: [],
      resultPage: 1,
      currentSearch: ''
    }
  },

  getSearchStoreState: function() {
    console.log(SearchStore.get());
    return SearchStore.get();
  },

  // handle when text changes in the main search bar
  handleSearchChange: function(event) {
    // on each key stroke in searchbar,
    // capture the entire input, use that for our search
    this.setState({currentSearch: event.target.value});
    // console.log(this.state.currentSearch);
    var searchInfo = {
      searchMode: this.state.searchMode,
      text: event.target.value,
      resultPage: 1
    };
    SearchActionCreators.submitSearch(searchInfo);
  },

  handleSearchModeClick: function(event) {
    console.log('changing searchMode to: ', event.target.dataset.searchMode);
    this.setState({searchMode: event.target.dataset.searchMode});
  },

  handleLoadMoreClick: function() {
    // do something with the search store here
    console.log('handleLoadMoreClick called');
    var searchInfo = {
      searchMode: this.state.searchMode,
      text: this.state.currentSearch,
      resultPage: this.state.resultPage + 1
    };
    SearchActionCreators.submitSearch(searchInfo);
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
      <button type="button"
        className="btn btn-sm btn-primary results-load-more-button"
        onClick={this.handleLoadMoreClick}>
          load more
      </button>
    );

    return (
      <div>
        <AppHeaderText />
        <div className="col-md-10 col-md-offset-1">
          <MainSearchBar searchMode={this.state.searchMode}
            handleSearchChange={this.handleSearchChange}
            resultPage={this.state.resultPage} />
        </div>

        <div className="row">
          <div className="col-md-12 text-center">

            <SearchModeButton label={'search by tech'}
              currMode={this.state.searchMode}
              modeName={'technologies'}
              handleClick={this.handleSearchModeClick} />

            <span className='text-primary main-search-mode-slash'>/</span>

            <SearchModeButton label={'search by name'}
              currMode={this.state.searchMode}
              modeName={'products'}
              handleClick={this.handleSearchModeClick} />

          </div>
        </div>


        <div className="main-search-results">
          <ProductList list={this.state.searchResults} />
        </div>

        <div className="text-center">
          {this.state.searchResults.length > 0 ? loadMoreButton : null}
        </div>

      </div>
    );
  }

});

module.exports = SearchView;

