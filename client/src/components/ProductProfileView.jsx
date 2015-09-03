var TechList = require('./TechList');

var ProductProfileView = React.createClass({
  getDefaultProps: function(){
    return {
      product_name: "Dummy company title",
      product_url: "www.google.com",
      product_technologies: ["angular", "aasdf", "ahuf"]
    }
  },
  render: function() {
    return (
      <div>
        <h1>{this.props.product_name}</h1>
        <a href={this.props.product_url}>Website</a>
        <h3>Tech Stack</h3>
        <TechList techs={this.props.product_technologies} />
      </div>
    );
  }
});

module.exports = ProductProfileView;