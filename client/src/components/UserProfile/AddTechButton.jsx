var React = require('react/addons');


var AddTechButton = React.createClass({
  render: function() {
    return (
      <div>
        <a type="button"
          className="pointer"
          data-toggle="modal"
          data-target=".add-user-tech">
            add tech
        </a>
      </div>
    );
  }
});

module.exports = AddTechButton;
