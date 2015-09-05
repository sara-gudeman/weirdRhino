var TechList = require('./TechList');
var ProductStore = require('../../stores/ProductStore');

var ProductProfileView = React.createClass({
  getInitialState: function(){
    return {
          product_name: "",
          product_url: "",
          product_technologies: []
        }
  },
  getProductStoreState: function () {
    return ProductStore.get();
  },

  componentDidMount: function() {
    var queryString = window.location.href.split('?')[1];
    $.ajax({
      url: 'api/products/' + '?' + queryString,
      type: 'GET',
      dataType: 'json',
      context: this,
      success: function(data) {
        this.setState(data);
      },
      error: function(xhr, status, errorThrown) {
        console.log('error', errorThrown, ' status ', status);
      },
      complete: function(xhr, status) {
        // console.log('complete', status);
      }
    });
    // this.setState({productInfo: this.getProductStoreState()});
    // console.log('state' + this.state);
  },

  render: function() {
    return (
      <div>
        <h1>{this.state.product_name}</h1>
        <a href={this.state.product_url}>Website</a>
        <h3>Tech Stack</h3>
        <TechList techs={this.state.product_technologies} />
      </div>
    );
  }
});

module.exports = ProductProfileView;
