var React = require('react/addons');


var AddTechButton = React.createClass({
  render: function() {
    return (
      <a type="button"
        className="pointer add-tech-button"
        data-toggle="modal"
        data-target=".add-user-tech">
          add tech
      </a>
    );
  }
});

module.exports = AddTechButton;
