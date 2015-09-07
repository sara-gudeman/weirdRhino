var jwt = require('jwt-simple');

var secret = 'loudNoises!';


module.exports = {

  userLogin: function(req, res) {
    console.log('user login request received...');
    console.log('req.body: ----------->', req.body);
    // dummy user data
    var user = {
      username: req.body.username,
      tech: ['jQuery', 'Node', 'React'],
      productsFollowing: ['blizzard', 'hackreactor'],
      token: jwt.encode(req.body.username, secret)
    };
    res.send(JSON.stringify(user));
    //
    // TODO: We will do authorization with a query check to the user DB here
    //
  },

  userSignup: function(req, res) {
    console.log('user signup request received...');
    console.log('req.body: ----------->', req.body);
    // dummy user data
    var user = {
      username: req.body.username,
      tech: ['jQuery', 'Node', 'React'],
      productsFollowing: ['blizzard', 'hackreactor'],
      token: jwt.encode(req.body.username, secret)
    };
    res.send(JSON.stringify(user));
    //
    // TODO: We will do authorization with a query check to the user DB
    // and addition of the user to the user DB here
    //
  }

};





