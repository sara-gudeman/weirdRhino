
module.exports = {

  userLogin: function(req, res) {
    console.log('user login request received...');
    console.log('req.body: ----------->', req.body);
    //
    //TODO: We will do authorization with queries to the user DB here
    //
    res.send(JSON.stringify(req.body));
  },

  userSignup: function(req, res) {
    console.log('user signup request received...');
    console.log('req.body: ----------->', req.body);
    //
    //TODO: We will do authorization with queries to the user DB here
    //
    res.send(JSON.stringify(req.body));
  }

};





