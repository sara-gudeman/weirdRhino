var React = require('react/addons');
var _ = require('underscore');

var TechList = require('../sharedComponents/TechList');
var ProductFollowButton = require('./ProductFollowButton');

var UserActionCreators = require('../../actions/UserActionCreators');


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
      type: 'PUT',
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
    var userInfo = this.props.userState;
    var userIsFollowing = false;

    _.each(userInfo.productsFollowing, function(product) {
      if (product.product_name === this.state.product_name) {
        userIsFollowing = true;
      }
    }, this);

    var bassClass = 'btn btn-sm product-follow-button ';
    var followButton = (
      <ProductFollowButton
        class={bassClass + (userIsFollowing ? 'btn-danger' : 'btn-primary')}
        label={userIsFollowing ? 'Unfollow' : 'Follow'}
        handleClick={this.handleFollowClick}/>
    );

    return (
      <div className="product-profile-container">
        <h1 className="product-profile-header">{this.state.product_name}</h1>
        <div className="product-item-url">
          <a href={this.state.product_url}
            target="_blank"
            className="text-muted">
              {this.state.product_url}
          </a>
          <p className="text-muted">Followers: {this.state.product_followers}</p>
          <p className="text-muted">Views: {this.state.product_views}</p>
        </div>
        {userInfo.isAuthenticated ? followButton : null}
        <br />
        <br />
        <div  className="well well-sm">
          <h3>Tech Stack</h3>
          <TechList techs={this.state.Technologies} />
        </div>
      </div>
    );
  }
});

module.exports = ProductProfileView;
