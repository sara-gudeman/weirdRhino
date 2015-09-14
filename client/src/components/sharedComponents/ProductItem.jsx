var React = require('react/addons');

var TechList = require('../sharedComponents/TechList');

var Router = require('react-router');
var Link = Router.Link;


var ProductItem = React.createClass({

  componentDidMount: function() {
    $('.product-item-favicon').error(function(){
        $(this).attr('src', 'http://www.georelated.com/favicon.ico');
    });
  },

  render: function() {
    return (
      <div className="well well-sm">

        <img src={this.props.favicon} className="product-item-favicon" />

        <Link to='product'
          query={{name: this.props.name}}>
            <h3 className="product-profile-header">{this.props.name}</h3>
        </Link>

        <div className="product-item-url">
          <a href={this.props.url}
            target="_blank"
            className="text-muted">
              {this.props.url}
          </a>
        </div>

        <TechList techs={this.props.techList} />
      </div>
    );
  }

});

module.exports = ProductItem;
