var React = require('react/addons');

var TechItem = require('./TechItem');


var TechList = React.createClass({
  render: function() {
    var techList = this.props.techs.map(function(tech, index) {
      return (
        <TechItem key={tech.id}
          name={tech.technology_name} />
      );
    });
    return (
      <div>
        {techList}
      </div>
    );
  }
});

module.exports = TechList;
