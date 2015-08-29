var mongoose = require('mongoose');

var mongoURI = 'mongodb://localhost/stackmatch';
console.log('CONNECTED TO:', mongoURI);

mongoose.connect(mongoURI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(cb) {
  console.log('MongoDB connection open');
});

module.exports = db;
