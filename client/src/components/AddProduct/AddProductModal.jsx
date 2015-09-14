var React = require('react/addons');
var AddProductForm = require('./AddProductForm');
var AddProductLoading = require('./AddProductLoading');
var AddProductError = require('./AddProductError');

var AddProductModal = React.createClass({
  handleUrlSubmit: function(event) {
    // need to add ajax request here
    // ajax request requires urls to use http://
    event.preventDefault();
    var userInput = React.findDOMNode(this.refs.urlInput).value;
    $.ajax({
      url: 'api/products/add',
      type: 'POST',
      data: {
        site: userInput
      },
      dataType: 'json',
      success: function(data) {
        console.log('entered handleUrlSubmit');
      },
      error: function(xhr, status, err) {
        console.log('Error: ', status, ' ', err);
      },
      complete: function(xhr, status) {
        console.log('completed handleUrlSubmit')
      }
    });
    console.log(React.findDOMNode(this.refs.urlInput).value);
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
              <AddProductForm ref="urlInput" handleUrlSubmit={this.handleUrlSubmit} />
              <AddProductLoading />
              <AddProductError />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AddProductModal;