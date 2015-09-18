var React = require('react/addons');
var $ = require('jquery');


var MainSearchBar = React.createClass({

  componentDidMount: function() {
    $('.main-search-bar').focus();
  },

  render: function() {
    var placeholderText = this.props.searchMode === 'technologies' ? 'jQuery, PHP, Twitter Bootstrap' : 'Search by site name';
    return (
      <div>
        <input type="search"
          ref="searchInputElement"
          className="main-search-bar form-control input-lg"
          placeholder={placeholderText}
          onChange={this.props.handleSearchChange} />
      </div>
    );
  }
});

module.exports = MainSearchBar;
