var React = require('react/addons');
var SearchActionCreators = require('../../actions/SearchActionCreators');


var MainSearchBar = React.createClass({

  componentDidMount: function() {
    $('.main-search-bar').focus();
  },

  render: function() {
    var placeholderText = this.props.searchMode === 'technologies' ? 'Search by technology' : 'Search by site name';
    return (
      <div>
        <input type="search"
          className="main-search-bar form-control input-lg"
          placeholder={placeholderText}
          onChange={this.props.handleSearchChange} />
      </div>
    );
  }
});

module.exports = MainSearchBar;
