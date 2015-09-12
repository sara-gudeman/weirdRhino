var React = require('react/addons');
var _ = require('underscore');

var ProductItem = require('./ProductItem');


var ProductList = React.createClass({
  render: function() {
    var productList = this.props.list.map(function(product, index) {
      return (
        <ProductItem key={product.id}
          id={product.id}
          name={product.product_name}
          techList={product.Technologies}
          url={product.product_url} />
      );
    });
    return (
      <div>
        {productList}
      </div>
    );
  }
});

module.exports = ProductList;
