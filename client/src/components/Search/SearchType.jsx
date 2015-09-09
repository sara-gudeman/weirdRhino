var SearchType = React.createClass({
  render: function() {
    return(
      <li className="pointer text-primary" data-search-mode={this.props.searchType} onClick={this.props.clickAction}>{this.props.searchLabel}</li>
    );
  }
});

module.exports = SearchType;