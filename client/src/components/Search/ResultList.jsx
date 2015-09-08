var React = require('react/addons');
var _ = require('underscore');

var ResultItem = require('./ResultItem');


var ResultList = React.createClass({
  render: function() {
    var techList;
    var resultList = this.props.list.map(function(product, index) {
      techList = _.pluck(product.Technologies, "technology_name");
      return (
        <ResultItem key={product.id}
          id={product.id}
          name={product.product_name}
          techList={techList}
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
