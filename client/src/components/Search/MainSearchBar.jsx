var React = require('react/addons');
var SearchType = require('./SearchType');
var SearchActionCreators = require('../../actions/SearchActionCreators');
var MainSearchBar = React.createClass({

  getInitialState: function() {
    return {searchMode: 'technologies'};
  },

  componentDidMount: function() {
    console.log('main-search-bar should be focused...');
    $('.main-search-bar').focus();
  },

  // handle when text changes in the main search bar
  handleSearchChange: function(event) {
    // on each key stroke in searchbar,
    // capture the entire input, use that for our search
    var searchInfo = {
      searchMode: this.state.searchMode,
      text: event.target.value,
      resultPage: 1
    };
    SearchActionCreators.submitSearch(searchInfo);
  },

  handleSearchClick: function(event, value) {
    this.setState({searchMode: event.target.dataset.searchMode});
  },

  render: function() {
    var placeholderText = "Search by " + this.state.searchMode;
    return (
      <div>
        <input className="main-search-bar form-control input-lg"
          type="search"
          placeholder={placeholderText}
          onChange={this.handleSearchChange} />
          <ul className="list-inline main-search-mode">
            <SearchType searchType="technologies" searchLabel="Technologies" clickAction={this.handleSearchClick} />
            <SearchType searchType="products" searchLabel="Products" clickAction={this.handleSearchClick} />
          </ul>
      </div>
    );
  }
});

module.exports = MainSearchBar;
