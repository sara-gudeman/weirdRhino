var UsernameInput = React.createClass({

  getDefaultProps: function() {
    return {
      placeholder: 'Username'
    };
  },

  handleChange: function(event, value) {
    this.props.changeUsername(event.target.value);
  },

  render: function() {
    return (
      <div>
        <input type="text"
            className="form-control input-sm login-input"
            placeholder={this.props.placeholder}
            onChange={this.handleChange} />
      </div>
    );
  }

});

module.exports = UsernameInput;
