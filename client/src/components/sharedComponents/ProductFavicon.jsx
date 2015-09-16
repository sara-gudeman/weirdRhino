var React = require('react/addons');


var ProductFavicon = React.createClass({

  getDefaultProps: function() {
    return {
      url: null
    };
  },

  componentDidMount: function() {
    $('.product-favicon-img').error(function(){
        $(this).attr('src', 'http://www.georelated.com/favicon.ico');
    });
  },

  render: function() {

    var faviconUrl = this.props.url ? this.props.url : 'http://www.georelated.com/favicon.ico';

    return (
      <img src={faviconUrl} className="product-favicon-img" />
    );
  }

});

module.exports = ProductFavicon;
