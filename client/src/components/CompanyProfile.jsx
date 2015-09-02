var TechList = require('./TechList');

var CompanyProfile = React.createClass({
  render: function() {
    <h1>{this.props.product_name}</h1>
    <a href={this.props.product_url}>Website</a>
    <h3>Tech Stack</h3>
    <TechList techs={this.props.product_technologies} />
  }
});