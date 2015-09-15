var React = require('react/addons');

var AddProductLoading = React.createClass({
  // possible option to display while loading
  // http://fgnass.github.io/spin.js/
  render: function() {
    return(
      <div>
        <p>Processing your request...</p>
      </div>
    );
  }
});

module.exports = AddProductLoading;