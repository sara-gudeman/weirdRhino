var NavButton = React.createClass({
  render: function() {
    return (
      <li role="presentation">
        <a href={this.props.url}>{this.props.label}</a>
      </li>
    );
  }
});

module.exports = NavButton;