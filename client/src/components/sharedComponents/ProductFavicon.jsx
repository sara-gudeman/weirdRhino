var React = require('react/addons');
var $ = require('jquery');

var ProductFavicon = React.createClass({

  getDefaultProps: function() {
    return {
      url: null
    };
  },

  componentDidMount: function() {
    $('.product-favicon-img').error(function(){
      $(this).attr('src', '/assets/ico-globe.png');
    });
  },

  render: function() {

    var faviconUrl = this.props.url ? this.props.url : '/assets/ico-globe.png';

    return (
      <img src={faviconUrl} className="product-favicon-img" />
    );
  }

});

module.exports = ProductFavicon;
