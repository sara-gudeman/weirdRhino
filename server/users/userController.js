var jwt = require('jwt-simple');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
var User = require('../db/models').User;

var secret = 'loudNoises!';


module.exports = {

  login: function(req, res) {
    console.log('user login request received...');
    console.log('req.body: ----------->', req.body);
    // dummy user data
    var user = {
      username: req.body.username,
      userTech: ['jQuery', 'Node', 'React'],
      productsFollowing: ['blizzard', 'hackreactor'],
      token: jwt.encode(req.body.username, secret)
    };
    res.send(JSON.stringify(user));
    //
    // TODO: We will do authorization with a query check to the user DB here
    //
  },

  signup: function(req, res) {
    console.log('user signup request received...');
    console.log('req.body: ----------->', req.body);

   User.findAll({
     where: {
       username: req.body.username
     } 
   })
   .then(function(user) {
     if(user.length > 0) {
       res.sendStatus(400);
       throw Error("Username taken");
       res.sendStatus(500);
     } else {
       return bcrypt.hashAsync(req.body.password, null, null);
     }
   })
   .then(function(hash) {
     console.log(hash);
      User.create({
        username: req.body.username,
        hashed_password: hash   
      })
      .then(function(user) {
        console.log(user);
        var userResponse = {
          username: user.username,
          userTech: ['jQuery', 'Node', 'React'],
          productsFollowing: ['blizzard', 'hackreactor'],
          token: jwt.encode(user.username, secret)
        };
        res.send(JSON.stringify(user));
      })

   })
   .catch(function(e) {
     console.log("ERROR in signup: ", e.message);
   });
  }

};





