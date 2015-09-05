var AuthSubmitButton = React.createClass({

  getDefaultProps: function() {
    return {
      placeholder: 'Submit'
    };
  },

  handleClick: function() {
    this.props.submit();
  },

  render: function() {
    return (
      <div>
        <input type="submit"
            className="btn btn-primary auth-submit-button"
            value="Submit"
            onClick={this.handleClick}/>
      </div>
    );
  }

});

module.exports = AuthSubmitButton;
