var React = require('react/addons');

var Router = require('react-router');
var Link = Router.Link;


var ProductItem = React.createClass({

  render: function() {
    return (
      <li>
        <Link to='product' query={{name: this.props.name}}>{this.props.name}</Link>
      </li>
    );
  }
});

module.exports = ProductItem;
