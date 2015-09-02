var NavBar = require('./NavBar');

var CompanyProfile = React.createClass({
  render: function() {
    return (
      <div>
        <NavBar/>
        <h1>Google</h1>
      </div>
    );
  }
});

module.exports = CompanyProfile;