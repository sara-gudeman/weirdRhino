var React = require('react/addons');


var SearchTechBar = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-8">

          <input type="search"
            className="form-control input-md"
            placeholder="Search by name" />

        </div>
      </div>
    );
  }
});

module.exports = SearchTechBar;
