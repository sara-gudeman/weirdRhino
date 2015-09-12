var React = require('react/addons');

var TechItem = require('./TechItem');


var TechList = React.createClass({

  //for cases where handleClick prop is not passed to component
  getDefaultProps: function() {
    return {
      handleTechClick: function() {},
      techItemClassName: ''
    };
  },

  render: function() {
    var context = this;
    var techList = this.props.techs.map(function(tech, index) {
      return (
        <TechItem handleClick={context.props.handleTechClick}
          addClass={context.props.techItemClassName}
          key={tech.id}
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
