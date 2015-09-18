var React = require('react/addons');

var AddProductForm = React.createClass({
  render: function() {
    return(
      <form onSubmit={this.props.handleUrlSubmit}>
        <div className="form-group">
          <input type="text" className="form-control" ref="urlInput" placeholder="Enter URL" />
        </div>
      </form>
    );
  }
});

module.exports = AddProductForm;
