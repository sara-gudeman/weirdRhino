var request = require('supertest');
var app = require('../server.js');


// describe('GET /', function(){
//   it('respond with json', function(done){
//     // the request-object is the supertest top level api
//     request(app)
//       .get('/')
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200, done); // note that we're passing the done as parameter to the expect
//   });
// });

request(app)
  .get('/')
  .expect('Content-Type', 'text/html; charset=UTF-8')
  .expect(200)
  .end(function(err, res){
    if (err) throw err;
  });