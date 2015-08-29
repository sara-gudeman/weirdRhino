var ResultItem = React.createClass({

  // placeholder click handler for result items
  handleResultClick: function() {
    console.log('list item clicked');
  },

  render: function() {
    var techs = this.props.techList.map(function(tech) {
      return tech + ' ';
    });
    return (
      <div className="result-item" onClick={this.handleResultClick}>
        <h3>{this.props.name}</h3>
        <p>{techs}</p>
      </div>
    );
  }
});
