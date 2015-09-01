var ResultItem = require('./ResultItem');
var ResultList = React.createClass({
  render: function() {
    var resultList = this.props.list.map(function(company, index) {
      return (
        <ResultItem key={index}
          name={company.product_name}
          techList={company.product_technologies}
          url={company.url} />
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