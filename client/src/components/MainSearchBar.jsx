var MainSearchBar = React.createClass({

  handleSearchChange: function(e) {
    this.props.filter(e.target.value);
  },

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
