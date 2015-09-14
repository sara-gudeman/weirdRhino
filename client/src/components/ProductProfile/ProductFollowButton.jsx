var React = require('react/addons');


var ProductFollowButton = React.createClass({

  render: function() {
    return (
      <button
        type="button"
        className={this.props.class}
        onClick={this.props.handleClick}>
          {this.props.label}
        </button>
    );
  }

});

module.exports = ProductFollowButton;
