var React = require('react/addons');

var Router = require('react-router');
var Link = Router.Link;


var ResultItem = React.createClass({

  render: function() {
    var techs = this.props.techList.map(function(tech) {
      return tech + ' ';
    });
    return (
        <div className="result-item" onClick={this.handleResultClick}>
          <Link to='product' query={{name: this.props.name}}><h3>{this.props.name}</h3></Link>
          <p>{techs}</p>
        </div>
    );
  }
});

module.exports = ResultItem;
