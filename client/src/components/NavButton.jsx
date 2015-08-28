var NavButton = React.createClass({
  render: function() {
    return (
      <div>
        <li>
          <a href={this.props.url}>{this.props.label}</a>
        </li>
      </div>
    );
  }
});
