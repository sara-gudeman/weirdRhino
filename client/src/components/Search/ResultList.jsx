var React = require('react/addons');
var _ = require('underscore');

var ResultItem = require('./ResultItem');


var ResultList = React.createClass({
  render: function() {
    var resultList = this.props.list.map(function(product, index) {
      return (
        <ResultItem key={product.id}
          id={product.id}
          name={product.product_name}
          techList={product.Technologies}
          url={product.product_url} />
      );
    });
    return (
      <div>
        {resultList}
      </div>
    );
  }
});

module.exports = ResultList;
