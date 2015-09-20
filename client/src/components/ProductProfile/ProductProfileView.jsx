var React = require('react/addons');
var _ = require('underscore');
var $ = require('jquery');

var TechList = require('../sharedComponents/TechList');
var ProductFollowButton = require('./ProductFollowButton');
var ProductFavicon = require('../sharedComponents/ProductFavicon');

var ProductStore = require('../../stores/ProductStore');

var UserActionCreators = require('../../actions/UserActionCreators');

var ProductActions = require('../../actions/ProductActionCreators');

var ProductProfileView = React.createClass({
  getInitialState: function(){
    return {
      product_name: '',
      product_url: '',
      product_followers: 0,
      Technologies: []
    };
  },

  getProductStoreState: function () {
    return ProductStore.get();
  },

  handleFollowClick: function(following) {
    // Update state so follower count adjusts and re-renders in profile view
    var followers = following ? this.state.product_followers - 1 : this.state.product_followers + 1;
    this.setState({'product_followers': followers});
    // add product to user's profile
    UserActionCreators.userProductFollows(this.state.product_name);
  },

  componentDidMount: function() {
    var queryString = window.location.href.split('?')[1];
    ProductActions.productQuery(queryString);
    ProductStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ProductStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    console.log('_onChange triggered with productState ', this.getProductStoreState())
    var productState = this.getProductStoreState();
    this.setState({
      product_name: productState.product_name,
      product_url: productState.product_url,
      product_followers: productState.product_views,
      Technologies: productState.Technologies
    });
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
        handleClick={this.handleFollowClick.bind(this, userIsFollowing)}/>
    );

    var techList = <TechList techs={this.state.Technologies} />;

    var noneMessage = <span className="text-muted">none found</span>;

    return (
      <div>

        <h1 className="product-profile-sitename">{this.state.product_name}</h1>

        <div className="product-item-url">

          <div className="product-profile-favicon">
            <ProductFavicon url={this.state.favicon_url} />
          </div>

          <a href={this.state.product_url}
            target="_blank"
            className="text-muted">
              {this.state.product_url}
          </a>
        </div>

        <br />

        <div>
          <span className="text-muted">Followers: {this.state.product_followers}</span>
          <br />
          <span className="text-muted">Views: {this.state.product_views}</span>
        </div>

        <br />

        {userInfo.isAuthenticated ? followButton : null}

        <br />
        <br />

        <div  className="well well-sm">
          <h3 className="product-profile-tech">Tech Stack</h3>
          {this.state.Technologies.length > 0 ? techList : noneMessage }
        </div>

      </div>
    );
  },


});

module.exports = ProductProfileView;
