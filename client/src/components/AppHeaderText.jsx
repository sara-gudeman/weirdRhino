var React = require('react/addons');

var Router = require('react-router');
var Link = Router.Link;


var AppHeaderText = React.createClass({

  // for redirecting user
  mixins: [Router.Navigation],

  // send user to search when app header is clicked
  handleHeaderClick: function() {
    this.transitionTo('search');
  },

  render: function() {
    return (
      <div>
        <h1 onClick={this.handleHeaderClick}
          className='text-center pointer app-header-text'>
          Stack Match
        </h1>
      </div>
    );
  }
});

module.exports = AppHeaderText;
