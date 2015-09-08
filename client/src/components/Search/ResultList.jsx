var React = require('react/addons');
var _ = require('underscore');

var ResultItem = require('./ResultItem');


var ResultList = React.createClass({
  render: function() {
    var techList;
    var resultList = this.props.list.map(function(company, index) {
      techList = _.pluck(company.Technologies, "technology_name");
      return (
        <ResultItem key={company.id}
          id={company.id}
          name={company.product_name}
          techList={techList}
          url={company.product_url} />
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
