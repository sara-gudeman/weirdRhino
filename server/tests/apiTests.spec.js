var app = require('../server.js');
var request = require('supertest').agent(app.listen());
var expect = require('chai').expect;
var models = require('../db/models');
var User = models.User;
var Technology = models.Technology;
var Product = models.Product;

// HOME PAGE

describe('main page', function() {
  // Main page

  // before(function (done) {
  //     server = app.listen(3000, function () {
  //         console.log('Server started');
  //         done();
  //     });
  // });

  // after(function (done) {
  //     server.close();
  //     server.on('close', function () {
  //         console.log('Server closed');
  //         done();
  //     });
  // });

  it('should return a 200 on a get to "/"', function(done) {
    request.get('/')
      .expect(200)
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .end(function(err, res){
        if (err)
          done(err);
        else
          done();
      });
  });

// });

// PRODUCTS AND TECHS

// describe('products get requests', function() {
// Products endpoints
  // it('should return a 200 on a get to "/api/products"', function(done) {
  //   request.get('/api/products?id=1')
  //     .expect(200)
  //     .expect('Content-Type', 'application/json; charset=utf-8')
  //     .end(function(err, res){
  //       if (err)
  //         done(err);
  //       else
  //         done();
  //     });
  // });

  // it('should return a product on a get to "/api/products" with query string', function(done) {
  //   request.get('/api/products?name=chase')
  //     .expect(200)
  //     .end(function(err, res){
  //       if (err)
  //         done(err);
  //       else
  //         expect(res.body).to.have.property('product_name');
  //         expect(res.body.product_name).to.not.equal(null);
  //         expect(res.body.product_name).to.equal('chase');
  //         done();
  //     });
  // });

// // });


// // describe('search by tech', function() {
//   // Main page
//   afterEach(function (done) {
//       done();
//       done();
//   });

//   it('should return a 200 on a post to "/api/products/searchbytech"', function(done) {
//     request.post('/api/products/searchbytech')
//       .send({
//         searchString: "jQuery"
//       })
//       .expect(200)
//       .expect('Content-Type', 'application/json; charset=utf-8')
//       .end(function(err, res){
//         if (err)
//           done(err);
//         else
//           expect(res.body).to.be.an.instanceof(Array);
//           expect(res.body[0]).to.have.property("product_name");
//           expect(res.body[0]).to.have.property("Technologies");
//           done();
//       });
//   });


// // describe('search by name', function() {
//   // Main page
//   it('should return a 200 on a post to "/api/products/searchbyname"', function(done) {
//     request.post('/api/products/searchbyname')
//       .send({
//         searchString: "chase"
//       })
//       .expect(200)
//       // .expect('Content-Type', 'application/json; charset=utf-8')
//       .end(function(err, res){
//         if (err)
//           done(err);
//         else
//           expect(res.body).to.be.an.instanceof(Array);
//           expect(res.body[0]).to.have.property("product_name");
//           expect(res.body[0]).to.have.property("Technologies");
//           done();
//       });
//   });

});

// Need to figure out how to dea with wappalizer taking its time
// describe('add products post request', function() {

//   before(function(done){
//     request.post('api/products/add')
//     .send({
//       site: "www.hackreactor.com"
//     })
//     .expect(200)
//     .end(function(err, res) {
//       if (err) console.log(err);
//     });
//   });

//   it('should return a product on a get to "/api/products" with query string', function(done) {
//     request.get('/api/products?name=hackreactor')
//       .expect(200)
//       .end(function(err, res){
//         if (err)
//           done(err);
//         else
//           expect(res.body).to.have.property('product_name');
//           expect(res.body.product_name).to.not.equal(null);
//           expect(res.body.product_name).to.equal('hackreactor');
//           done();
//       });
//   });

// });


// note: figure out how to implement async here.  getting a "done called too many times" error when two tests are run to same route
  // it('should return an empty array on a post to "/api/products/searchbytech" when tech does not exist', function(done) {
  //   request.post('/api/products/searchbytech')
  //     .send({
  //       searchString: "asdf"
  //     })
  //     .expect(200)
  //     .expect('Content-Type', 'application/json; charset=utf-8')
  //     .end(function(err, res){
  //       if (err)
  //         done(err);
  //       else
  //         expect(res.body).to.be.an.instanceof(Array);
  //         expect(res.body).to.be.empty;
  //         done();
  //     });
  // });

// });
