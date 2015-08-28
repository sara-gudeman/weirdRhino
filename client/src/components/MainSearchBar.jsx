var MainSearchBar = React.createClass({

  handleSearchChange: function(e) {
    this.props.filter(e.target.value);
  },

  render: function() {
    return (
      <div>
        <input type="search"
          placeholder="Enter company"
          onChange={this.handleSearchChange} />
      </div>
    );
  }
});
