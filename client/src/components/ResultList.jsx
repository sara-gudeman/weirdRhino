var ResultItem = require('./ResultItem');
var ResultList = React.createClass({
  render: function() {
    console.log('render ResultList');
    console.log('resultList props', this.props.list);
    var resultList = [];
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
    // var resultList = this.props.list.map(function(company, index) {
    //   return (
    //     <ResultItem key={index}
    //       name={company.name}
    //       techList={company.techList}
    //       url={company.url} />
    //   );
    // });
    return (
      <div>
        {resultList}
      </div>
    );
  }
});

module.exports = ResultList;