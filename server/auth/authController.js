
module.exports = {

  userLogin: function(req, res) {
    console.log('user login request received...');
    console.log('req.body: ----------->', req.body);
    res.send(JSON.stringify('hi there'));
  }

};





