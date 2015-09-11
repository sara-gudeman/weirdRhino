var React = require('react/addons');

var TechItem = React.createClass({

  //for cases where handleClick prop is not passed to component
  getDefaultProps: function() {
    return {
      handleClick: function() {}
    };
  },

  handleClick: function() {
    this.props.handleClick(this.props.name);
  },

  render: function() {
    return (
      <button onClick={this.handleClick}
        type="button"
        className="btn btn-default btn-xs tech-item-button">
          {this.props.name}
      </button>
    );
  }

});

module.exports = TechItem;
