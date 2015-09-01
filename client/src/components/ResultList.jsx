var ResultItem = require('./ResultItem');
var ResultList = React.createClass({
  render: function() {
    var resultList = [];
    // For loop in use because map was not available on this.props.list
      // TODO: figure out how to make map work?
    var updateList = function(company, index) {
      return (
        <ResultItem key={index}
          name={company.product_name}
          techList={company.product_technologies}
          url={company.url} />
      );
    }
    for (var i = 0; i < this.props.list.length; i++) {
      resultList.push(updateList(this.props.list[i], i));
    }
    return (
      <div>
        {resultList}
      </div>
    );
  }
});

module.exports = ResultList;