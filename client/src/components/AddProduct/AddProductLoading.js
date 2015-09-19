var React = require('react/addons');

var AddProductLoading = React.createClass({
  render: function() {
    return(
      <div>
        <p>Processing your request...</p>
      </div>
    );
  }
});

module.exports = AddProductLoading;