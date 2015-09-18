var React = require('react/addons');
var AddProductForm = require('./AddProductForm');
var AddProductLoading = require('./AddProductLoading');
var AddProductError = require('./AddProductError');


var Router = require('react-router');

var AddProductModal = React.createClass({
  mixins : [Router.Navigation],

  getInitialState: function() {
    return { loading: false, error: false };
  },

  handleUrlSubmit: function(event) {
    // need to add ajax request here
    // ajax request requires urls to use http://
    event.preventDefault();
    var userInput = React.findDOMNode(this.refs.urlForm.refs.urlInput).value;
    console.log(userInput);
    this.setState({
      loading: true,
      error: false
    });

    $.ajax({
      url: 'api/products/add',
      type: 'POST',
      data: {
        site: userInput
      },
      dataType: 'json',
      success: function(data) {
        this.setState({ loading: false, error: false });
        console.log('entered handleUrlSubmit, returned data: ', data);
        var product_name = data.product_name;
        this.transitionTo('product', null, {name: product_name});
        $('.close').trigger('click');
        document.location.reload();
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({ loading: false, error: true });
        console.log('Error: ', status, ' ', err);
      }.bind(this),
      complete: function(xhr, status) {
        this.setState({ loading: false });
        console.log('completed handleUrlSubmit')
      }.bind(this)
    });
  },

  render: function() {
    var form = <AddProductForm ref="urlForm" handleUrlSubmit={this.handleUrlSubmit} />;
    var loading = <AddProductLoading />;
    var error = <AddProductError />;
    var modalState = this.state.loading ? loading : form;
    var errorState = this.state.error ? error : null;
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
              { modalState }
              { errorState }
            </div>

            <div className="modal-footer">
              <button type="button"  className="btn btn-default" data-dismiss="modal">Close</button>
            </div>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = AddProductModal;
