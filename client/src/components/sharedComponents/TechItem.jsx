var React = require('react/addons');

var TechItem = React.createClass({

  getDefaultProps: function() {
    return {
      handleTechClick: function() {},
      addClass: ''
    };
  },

  getInitialState: function(){
    return {
      className: 'btn btn-default btn-xs tech-item-button ' + this.props.addClass
    };
  },

  handleClick: function() {
    this.props.handleClick(this.props.name);
  },

  render: function() {
    return (
      <button onClick={this.handleClick}
        type="button"
        className={this.state.className}>
          {this.props.name}
      </button>
    );
  }

});

module.exports = TechItem;
