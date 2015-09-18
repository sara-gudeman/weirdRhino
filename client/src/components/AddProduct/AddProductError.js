var React = require('react/addons');

var AddProductError = React.createClass({
  render: function() {
    return(
      <div>
        <p>Error processing your request.</p>
        <p>Please enter URL in the format:&nbsp;&nbsp;<span className="add-product-site-text">'website.com'</span></p>
      </div>
    );
  }
});

module.exports = AddProductError;
