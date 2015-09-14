var React = require('react/addons');

var AddProductError = React.createClass({
  render: function() {
    return(
      <div>
        <p>Error processing your request.</p>
        <p>Please enter url in the format http://www.website.com</p>
      </div>
    );
  }
});

module.exports = AddProductError;