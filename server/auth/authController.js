
module.exports = {

  userLogin: function(req, res) {
    console.log('user login request received...');
    console.log('req.body: ----------->', req.body);
    res.send(JSON.stringify(req.body));
  },

  userSignup: function(req, res) {
    console.log('user signup request received...');
    console.log('req.body: ----------->', req.body);
    res.send(JSON.stringify(req.body));
  }

};





