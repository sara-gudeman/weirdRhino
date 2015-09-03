var TechList = require('./TechList');

var ProductProfileView = React.createClass({
  render: function() {
    <div>
      <Link to='product'>{this.props.product_name}</Link>
      <h1>{this.props.product_name}</h1>
      <a href={this.props.product_url}>Website</a>
      <h3>Tech Stack</h3>
      <TechList techs={this.props.product_technologies} />
    </div>
  }
});

module.exports = ProductProfileView;