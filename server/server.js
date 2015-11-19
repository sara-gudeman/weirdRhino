var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var db = require('./db/models').sequelize;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

require('./routes/routes')(app, express);

var port = process.env.PORT || 8080;
var node_env = process.env.NODE_ENV;


app.use(express.static(__dirname + '/../client/static'));
app.use(express.static(__dirname + '/../client/build'));
app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

if (require.main === module) {

  app.listen(port);
  console.log('listening on ' + port);
  console.log('app listening on port: ' + port + ' in ' + node_env + ' mode.');
}

exports = module.exports = app;
