var React = require('react/addons');

var TechList = require('../sharedComponents/TechList');

var UserActionCreators = require('../../actions/UserActionCreators');
// not currently used
// var ProductStore = require('../../stores/ProductStore');


var ProductProfileView = React.createClass({
  getInitialState: function(){
    return {
          product_name: "",
          product_url: "",
          Technologies: []
        }
  },
  getProductStoreState: function () {
    return ProductStore.get();
  },

  componentDidMount: function() {
    var queryString = window.location.href.split('?')[1];
    $.ajax({
      url: 'api/products/' + '?' + queryString,
      type: 'GET',
      dataType: 'json',
      context: this,
      success: function(data) {
        // console.log('productProfileState', data);
        this.setState(data);
      },
      error: function(xhr, status, errorThrown) {
        console.log('error', errorThrown, ' status ', status);
      },
      complete: function(xhr, status) {
        // console.log('complete', status);
      }
    });
  },

  handleFollowClick: function() {
    UserActionCreators.userProductFollows(this.state.product_name);
  },

  render: function() {
    var follow = <a href="#" onClick={this.handleFollowClick}>Follow</a>;
    var unfollow = <a href="#">Unfollow</a>;
    return (
      <div>
        <h1>{this.state.product_name}</h1>
        { follow } <br />
        <a href={this.state.product_url}>Website</a>
        <h3>Tech Stack</h3>
        <TechList techs={this.state.Technologies} />
      </div>
    );
  }
});

module.exports = ProductProfileView;
