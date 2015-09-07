var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var NavButton = React.createClass({
  render: function() {
    return (
      <li role="presentation">
        <Link to={this.props.navTo}>{this.props.label}</Link>
      </li>
    );
  }
});

module.exports = NavButton;