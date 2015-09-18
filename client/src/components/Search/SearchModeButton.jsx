var React = require('react/addons');

var SearchModeButton = React.createClass({

  handleClick: function() {
    this.props.handleClick(this.props.modeName);
  },

  render: function() {
    // sets button to 'active' or not depending on current search mode
    var className;
    if(this.props.currMode === this.props.modeName) {
      className = 'pointer main-search-mode-button main-search-mode-button-active';
    } else {
      className = 'pointer main-search-mode-button';
    }

    return(
      <a className={className}
        onClick={this.props.handleClick}
        data-search-mode={this.props.modeName}>
          {this.props.label}
      </a>
    );
  }

});

module.exports = SearchModeButton;
