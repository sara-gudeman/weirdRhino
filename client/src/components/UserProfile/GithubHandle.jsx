var React = require('react/addons');


var GithubHandleForm = React.createClass({

  getInitialState: function(){
    return {
      handleIsEditing: false
    };
  },

  handleEditClick: function() {
    console.log('edit clicked...');
    this.setState({handleIsEditing: true});
  },

  githubHandleSubmit: function() {
    this.setState({handleIsEditing: false});
    this.props.handleSubmit();
  },

  render: function() {

    var form = (
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={this.githubHandleSubmit} >
              <input type="text"
                id="user-github-handle"
                className="form-control input-sm"
                placeholder="Add github username" />
          </form>
        </div>
      </div>
    );

    var handle = (
      <div>
        <strong>Github: </strong>
        <a href={this.props.githubHandle} target="_blank" className="text-muted">{this.props.githubHandle}</a>
        <br />
        <a className="pointer" onClick={this.handleEditClick}>edit</a>
      </div>
    );

    return (
      <div>
        {(this.props.githubHandle && !this.state.handleIsEditing) ? handle : form}
      </div>
    );
  }

});

module.exports = GithubHandleForm;
