var React = require('react/addons');


var RemoveTechButton = React.createClass({
  render: function() {
    return (
      <a onClick={this.props.handleClick}
        type="button"
        className="pointer add-tech-button">
          {this.props.buttonName}
      </a>
    );
  }
});

module.exports = RemoveTechButton;
