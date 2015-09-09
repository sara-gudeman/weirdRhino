var React = require('react/addons');
var SearchType = require('./SearchType');
var SearchActionCreators = require('../../actions/SearchActionCreators');
var MainSearchBar = React.createClass({

  getInitialState: function() {
    return {searchMode: 'tech'};
  },
  // handle when text changes in the main search bar
  // perhaps this ought to be defined in SearchView and passed in to
  // MainSearchBar as an attribute???
  handleSearchChange: function(event, value) {
    // on each key stroke in searchbar,
    // capture the entire input, use that for our search
    var searchInfo = {
      searchMode: this.state.searchMode,
      text: event.target.value
    };
    
    SearchActionCreators.submitSearch(searchInfo);
  },

  handleSearchClick: function(event, value) {
    this.setState({searchMode: event.target.dataset.searchMode});
  },

  // eventually deal with enter submission

  render: function() {
    return (
      <div>
        <input className="main-search-bar form-control input-lg"
          type="search"
          placeholder="Search by technology"
          onChange={this.handleSearchChange} />
          <ul className="list-inline search-types">
            <SearchType searchType="tech" searchLabel="Technology" clickAction={this.handleSearchClick} />
            <SearchType searchType="product" searchLabel="Product" clickAction={this.handleSearchClick} />
          </ul>
      </div>
    );
  }
});

module.exports = MainSearchBar;
