var TechItem = require('./TechItem');

var TechList = React.createClass({
  var techList = this.props.techs.map(function(tech) {
    return (
      <TechItem name={tech.name}
        link={tech.url} />
    );
  });
  return (
    <div>
      {techList}
    </div>
  )
});