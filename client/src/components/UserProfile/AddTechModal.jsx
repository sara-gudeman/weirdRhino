var React = require('react/addons');

var SearchTechBar = require('./SearchTechBar');
var TechList = require('../sharedComponents/TechList');
var TechnologyStore = require('../../stores/TechnologyStore');


var AddTechModal = React.createClass({

  getInitialState: function(){
    return {
      userTech: []
    };
  },

  render: function() {

    // show "none yet" if userTech is an empty array
    var techList = (
      <TechList techs={this.state.userTech} />
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
              <SearchTechBar />
            </div>

            <div className="modal-body">
              {(this.state.userTech.length === 0) ? noTech : techList}
            </div>

          </div>
        </div>
      </div>
    );
  }
});

module.exports = AddTechModal;
