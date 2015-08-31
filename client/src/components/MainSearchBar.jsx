var SearchActionCreators = require('../actions/SearchActionCreators');
var React = require('react');

var MainSearchBar = React.createClass({

  getInitialState: function() {
    return {text: ''};
  },

  // user enters data into search bar
  handleSearchChange: function(event, value) {
    console.log('key up');
    this.setState({text: event.target.value});
    SearchActionCreators.submitSearch(this.state.text);   
    // on each key stroke in searchbar,
    // -- capture the entire input, use that for our search
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