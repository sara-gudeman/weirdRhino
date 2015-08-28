var ResultList = React.createClass({
  render: function() {
    var resultList = this.props.list.map(function(company, index) {
      return (
        <ResultItem key={index}
          name={company.name}
          techList={company.techList}
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
