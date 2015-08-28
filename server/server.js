var express = require('express');
var bodyParser = ('body-parser');

var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '../client/static'));

app.listen(port);
console.log('listening on ' + port);

exports = module.exports = app;