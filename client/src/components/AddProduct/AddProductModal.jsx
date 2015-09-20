var React = require('react/addons');
var $ = require('jquery');
var AddProductForm = require('./AddProductForm');
var AddProductLoading = require('./AddProductLoading');
var AddProductError = require('./AddProductError');

var ProductStore = require('../../stores/ProductStore');
var ProductActions = require('../../actions/ProductActionCreators');

var Router = require('react-router');

var AddProductModal = React.createClass({
  mixins : [Router.Navigation, Router.State, Router.CurrentPath],

  getInitialState: function() {
    return ProductStore.getProductStatus();
  },

  handleUrlSubmit: function(event) {
    event.preventDefault();
    var userInput = React.findDOMNode(this.refs.urlForm.refs.urlInput).value;

    this.setState({
      loading: true,
      error: false
    });

    ProductActions.submitProduct(userInput);

    // $.ajax({
    //   url: 'api/products/add',
    //   type: 'POST',
    //   data: {
    //     site: userInput
    //   },
    //   dataType: 'json',
    //   success: function(data) {
    //     this.setState({ loading: false, error: false });
    //     var product_name = data.product_name;
    //     this.transitionTo('product', null, {name: product_name});
    //     $('.close').trigger('click');
    //     if (this.getPath().indexOf('product') !== -1) {
    //       document.location.reload();
    //     }
    //   }.bind(this),
    //   error: function(xhr, status, errorThrown) {
    //     this.setState({ loading: false, error: true });
    //     throw new Error('Error in AddProductModule. Error information: ' + xhr + ' ' + status + ' ' + errorThrown);
    //   }.bind(this),
    //   complete: function() {
    //     this.setState({ loading: false });
    //   }.bind(this)
    // });
  },

  // update modal view based on current submit status
  updateModalView: function() {
    if (!this.state.loading && !this.state.error && this.state.productInfo) {
      var product_name = this.state.productInfo.product_name;
      this.transitionTo('product', null, {name: product_name});
      $('.close').trigger('click');
      if (this.getPath().indexOf('product') !== -1) {
        document.location.reload();
      }
    }
  },

  // register listeners
  componentDidMount: function() {
    ProductStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    ProductStore.removeChangeListener(this._onChange);
  },
  // update the view based on changes in ProductStore
  _onChange: function() {
    var submitStatus = ProductStore.getProductStatus();
    this.setState({
      loading: submitStatus.loading,
      error: submitStatus.error,
      productInfo: submitStatus.productInfo
    });
    this.updateModalView();
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
