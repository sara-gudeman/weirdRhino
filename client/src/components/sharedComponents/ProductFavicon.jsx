var React = require('react/addons');


var ProductFavicon = React.createClass({

  getDefaultProps: function() {
    return {
      url: null
    };
  },

  render: function() {

    var faviconUrl = this.props.url ? this.props.url : 'http://www.georelated.com/favicon.ico';

    return (
      <img src={faviconUrl} className="product-favicon-img" />
    );
  }

});

module.exports = ProductFavicon;
