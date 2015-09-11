var React = require('react/addons');

var SearchTechBar = require('./SearchTechBar');
var TechList = require('../sharedComponents/TechList');

var TechnologyStore = require('../../stores/TechnologyStore');
var TechnologyActionCreators = require('../../actions/TechnologyActionCreators');
var UserStore = require('../../stores/UserStore');
var UserActionCreators = require('../../actions/UserActionCreators');

var AddTechModal = React.createClass({

  // set initial search results to an empty array
  getInitialState: function() {
    return {
      searchResults: []
    }
  },

  getTechnologyStoreState: function() {
    console.log(TechnologyStore.get());
    return TechnologyStore.get();
  },

  handleSearchChange: function(event) {
    // on each key stroke in tech search bar,
    // capture the entire input, use that for our search
    var searchString = event.target.value;
    TechnologyActionCreators.submitSearch(searchString);
  },

  handleTechClick: function(name) {
    // this will be passed to the techlist and then to techitem
    console.log('tech name: ', name);
  },

  // Add change listeners
  componentDidMount: function() {
    TechnologyStore.addChangeListener(this._onChange);
  },

  // Remove change listeners
  componentWillUnmount: function() {
    TechnologyStore.removeChangeListener(this._onChange);
  },

  // Update state when store changes - triggers re-render
  _onChange: function() {
    this.setState({searchResults: this.getTechnologyStoreState()});
  },

  render: function() {
    // show "..." if userTech is an empty array
    var techList = (
      <TechList techs={this.state.searchResults} handleTechClick={this.handleTechClick} />
    );

    var noTech = (
      <p className="text-muted">...</p>
    );

    return (
      <div className="modal fade add-user-tech">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">
                  &times;
                </span>
              </button>
              <h4 className="modal-title">Add a technology</h4>
              <br />
              <SearchTechBar handleChange={this.handleSearchChange} />
            </div>

            <div className="modal-body tech-search-body">
              {(this.state.searchResults.length === 0) ? noTech : techList}
            </div>

          </div>
        </div>
      </div>
    );
  }

});

module.exports = AddTechModal;
