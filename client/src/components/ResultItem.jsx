var ResultItem = React.createClass({

  // placeholder click handler for result items
  handleResultClick: function() {
    console.log('list item clicked');
  },

  render: function() {
    // var techs = this.props.techList.map(function(tech) {
    //   return tech + ' ';
    // });
    var techs = '';
    var updateTechs = function(tech) {
      techs = techs + tech + ' ';
    }
    for (var i = 0; i < this.props.techList.length; i ++) {
      updateTechs(this.props.techList[i]);
    }
    return (
      <div className="result-item" onClick={this.handleResultClick}>
        <h3>{this.props.name}</h3>
        <p>{techs}</p>
      </div>
    );
  }
});

module.exports = ResultItem;