var React = require('react/addons');

var TechItem = require('./ProductItem');


var ProductList = React.createClass({
  render: function() {
    var productList = this.props.products.map(function(product, index) {
      return (
        <TechItem key={index} name={product} />
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
