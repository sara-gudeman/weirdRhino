var React = require('react/addons');

var ProductItem = require('./ProductItem');


var ProductList = React.createClass({

  getDefaultProps: function () {
    return {list: []};
  },

  render: function() {

    var productList = this.props.list.map(function(product, index) {

      // deal with favicon urls
      // maybe deal with favicon urls more effectively on the server side upon scrape
      if(product.favicon_url === null) {
        product.favicon_url = 'http://www.georelated.com/favicon.ico';
      } else if(product.favicon_url.slice(0, 4) !== 'http') {
        if(product.product_url.slice(product.product_url.length - 1) === '/'){
          product.favicon_url = product.product_url.slice(0, product.product_url.length - 1) + product.favicon_url;
        } else {
          product.favicon_url = product.product_url + product.favicon_url;
        }
      }

      return (
        <ProductItem key={product.id}
          id={product.id}
          name={product.product_name}
          favicon={product.favicon_url}
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
