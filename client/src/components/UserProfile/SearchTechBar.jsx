var React = require('react/addons');


var SearchTechBar = React.createClass({

  handleChange: function(event) {
    this.props.handleChange(event);
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-8">

          <input onChange={this.handleChange}
            type="search"
            className="form-control input-md"
            placeholder="Search by name" />

        </div>
      </div>
    );
  }
});

module.exports = SearchTechBar;
