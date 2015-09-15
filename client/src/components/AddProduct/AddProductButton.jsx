var React = require('react/addons');

var AddProductButton = React.createClass({
  render: function() {
    return(
      <li role="presentation">
        <a type="button"
          className="pointer"
          data-toggle="modal"
          data-target=".add-product">
            Add product
        </a>
      </li>
    );
  }
});

module.exports = AddProductButton;