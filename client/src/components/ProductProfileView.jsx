var TechList = require('./TechList');
var ProductStore = require('../stores/ProductStore');

var ProductProfileView = React.createClass({
  getDefaultProps: function(){
    return {
      product_name: "Dummy company title",
      product_url: "www.google.com",
      product_technologies: ["angular", "aasdf", "ahuf"]
    }
  },
  getProductStoreState: function () {
    return ProductStore.get();
  },

  componentDidMount: function() {
    // console.log('product componentDidMount');
    this.setState({productInfo: this.getProductStoreState});
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