var React = require('react/addons');

var TechList = require('../sharedComponents/TechList');

var Router = require('react-router');
var Link = Router.Link;


var ResultItem = React.createClass({

  render: function() {
    return (
      <div className="well well-sm result-item pointer">

        <Link to='product'
          query={{name: this.props.name}}>
            <h3 className="product-item-header">{this.props.name}</h3>
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

module.exports = ResultItem;
