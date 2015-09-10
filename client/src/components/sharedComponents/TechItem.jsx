var React = require('react/addons');

var TechItem = React.createClass({
  render: function() {
    return (
      <button type="button"
        className="btn btn-default btn-xs tech-item-button">
          {this.props.name}
      </button>
    );
  }
});

module.exports = TechItem;
