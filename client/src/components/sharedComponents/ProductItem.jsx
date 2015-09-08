var React = require('react/addons');

var ProductItem = React.createClass({
  render: function() {
    return (
      <li>
        <a href={this.props.link}>{this.props.name}</a>
      </li>
    );
  }
});

module.exports = ProductItem;
