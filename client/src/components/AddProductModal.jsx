var React = require('react/addons');

var AddProductModal = React.createClass({
  handleUrlSubmit: function(e) {
    // need to add ajax request here
    e.preventDefault();
    alert('submit entered');
  },

  render: function() {
    return(
      <div className="modal fade add-product">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title">Add a website to our database</h4>
            </div>

            <div className="modal-body">
              <form onSubmit={this.handleUrlSubmit}>
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Enter url here" />
                  <input type="submit" value="Submit"/>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AddProductModal;