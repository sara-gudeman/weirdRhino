var AddProductForm = React.createClass({
  render: function() {
    return(
      <form onSubmit={this.props.handleUrlSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" ref="urlInput" placeholder="Enter url here" />
          <input type="submit" value="Submit"/>
        </div>
      </form>
    );
  }
});

module.exports = AddProductForm;