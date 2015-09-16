var React = require('react/addons');

var ProductItem = require('./ProductItem');


var ProductList = React.createClass({

  getDefaultProps: function () {
    return {list: []};
  },

  render: function() {

    var productList = this.props.list.map(function(product, index) {
      return (
        <ProductItem key={product.id}
          id={product.id}
          name={product.product_name}
          faviconUrl={product.favicon_url}
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
