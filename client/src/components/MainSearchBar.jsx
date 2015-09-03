var SearchActionCreators = require('../actions/SearchActionCreators');
var React = require('react/addons');
var MainSearchBar = React.createClass({

  // handle when text changes in the main search bar
  handleSearchChange: function(event, value) {
    // on each key stroke in searchbar,
    // capture the entire input, use that for our search
    SearchActionCreators.submitSearch(event.target.value);
  },

  // eventually deal with enter submission

  render: function() {
    return (
      <div>
        <input className="main-search-bar form-control input-lg"
          type="search"
          placeholder="Search by technology"
          onChange={this.handleSearchChange} />
      </div>
    );
  }
});

module.exports = MainSearchBar;
