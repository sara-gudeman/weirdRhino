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
      currentSearch: '',
      searchIsLoading: false
    };
  },

  getSearchStoreState: function() {
    return SearchStore.get();
  },

  // handle when text changes in the main search bar
  handleSearchChange: function(event) {
    event.preventDefault();
    // on each key stroke in searchbar,
    // capture the entire input, use that for our search
    this.setState({
      searchIsLoading: event.target.value.length > 0,
      currentSearch: event.target.value,
      resultPage: 1
    });
    // this.setState({resultPage: 1});
    // console.log(this.state.currentSearch);
    var searchInfo = {
      searchMode: this.state.searchMode,
      text: event.target.value,
      resultPage: 1
    };
    SearchActionCreators.submitSearch(searchInfo);
  },

  handleSearchModeClick: function(event) {
    // clear search input
    React.findDOMNode(this.refs.searchBarComponent.refs.searchInputElement).value = '';
    // send empty string request to clear previous values from search store
    var searchInfo = {
      searchMode: this.state.searchMode,
      text: '',
      resultPage: 1
    };
    SearchActionCreators.submitSearch(searchInfo);
    // set state
    this.setState({
      searchMode: event.target.dataset.searchMode,
      resultPage: 1
    });

  },

  handleLoadMoreClick: function(e) {
    // do something with the search store here
    e.preventDefault();
    var page = this.state.resultPage;
    this.setState({resultPage: this.state.resultPage + 1});
    var searchInfo = {
      searchMode: this.state.searchMode,
      text: this.state.currentSearch,
      resultPage: page + 1
    };
    SearchActionCreators.submitSearch(searchInfo);
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
    this.setState({
      searchResults: this.getSearchStoreState(),
      searchIsLoading: false
    });
  },

  render: function() {

    var loadMoreButton = (
      <button type="button"
        className="btn btn-sm btn-primary results-load-more-button"
        onClick={this.handleLoadMoreClick}>
          load more
      </button>
    );

    var loadingMessage = <h2 className="text-center search-loading-message">loading...</h2>;
    var productList = <ProductList list={this.state.searchResults} />;
    var loadingOrProducts = this.state.searchIsLoading ? loadingMessage : productList;

    return (
      <div>
        <AppHeaderText />
        <div className="col-md-10 col-md-offset-1">
          <MainSearchBar searchMode={this.state.searchMode}
            handleSearchChange={this.handleSearchChange}
            resultPage={this.state.resultPage}
            ref="searchBarComponent"/>
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
          {loadingOrProducts}
        </div>

        <div className="text-center">
          {this.state.searchResults.length > 0 && !this.state.searchIsLoading ? loadMoreButton : null}
        </div>

      </div>
    );
  }

});

module.exports = SearchView;
