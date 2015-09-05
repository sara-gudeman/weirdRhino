var TechItem = require('./TechItem');

var TechList = React.createClass({


  render: function() {
    var techList = this.props.techs.map(function(tech, index) {
      return (
        <TechItem key={index}
          name={tech} />
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