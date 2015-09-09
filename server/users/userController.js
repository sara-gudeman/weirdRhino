var jwt = require('jwt-simple');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
var models = require('../db/models');
var User = models.User;
var Technology = models.Technology;
var Product = models.Product;

var secret = 'loudNoises!';


module.exports = {

  login: function(req, res) {
    console.log('user login request received...');
    console.log('req.body: ----------->', req.body);
    User.findOne({
      where: {username: req.body.username},
      include: [{model: Technology}, {model: Product}]
    })
    .then(function(user) {
      if(!user) {
        res.sendStatus(422);
        throw Error("No user was returned");
      } else {
        return [bcrypt.compareSync(req.body.password, user.hashed_password), user];
      }
    })
    .then(function(userHashTuple) {
      var user = userHashTuple[1];
      var isValid = userHashTuple[0];
      // console.log('login is valid? =====> ', isValid);
      if(isValid) {
        var payload = {
          username: user.username,
          date: Date.now()
        }
        console.log(user);
        user.token = jwt.encode(payload, secret);
        user.save()
        .then(function(user) {
          delete user.hashed_password;
          res.send(JSON.stringify(user));
        })
        .catch(function(e) {
          res.sendStatus(500);
          console.log("Trouble updating token: ", e.message);
        });
      } else {
        res.sendStatus(401);
        throw Error("Incorrect Login attempt");
      }
    });
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
        res.sendStatus(422);
        throw Error("Username taken");
        res.sendStatus(500);
      } else {
        return bcrypt.hashAsync(req.body.password, null, null);
      }
    })
    .then(function(hash) {
      console.log(hash);
      var payload = {
        username: req.body.username,
        date: Date.now()
      }

      User.create({
        username: req.body.username,
        hashed_password: hash,
        token: jwt.encode(payload, secret)
      })
      .then(function(user) {
        delete user.hashed_password;
        res.send(JSON.stringify(user));
      })

    })
    .catch(function(e) {
      console.log("ERROR in signup: ", e.message);
    });
  },


  getUser: function(req, res) {
    console.log("POST api/users/username with username: ", req.body.username);
    if(!req.body.token) {
      res.sendStatus(401);
      return;
    }

    var token = jwt.decode(req.body.token, secret);

    if(Math.floor((Date.now() - token.date) / (1000*60*60*24)) > 7) {
      res.sendStatus(401);
      console.log("Expired token: ", token);
      return;
    }

    User.findOne({
      where: {username: token.username},
      include: [{model: Technology}, {model: Product}]
    })
    .then(function(user) {
      user.token = jwt.encode({username: user.username, date: Date.now()}, secret);
      return user.save();
    })
    .then(function(user) {
      delete user.hashed_password;
      res.json(user);
    })
    .catch(function(e) {
      res.sendStatus(500);
      console.log("ERROR in getUser: ", e.message);
    });
  },


  addTechToUser: function(req, res) {

    var technology_name = req.body.technology_name;
    var username = req.body.username;
    var techFound;

    console.log('add technology to user received...');
    console.log('technology_name: ', technology_name);
    console.log('username: ', username);

    // check if the user-entered tech exists in DB tech table
    return Technology.findOne({
      where: {technology_name: technology_name}
    })
    .then(function(tech) {
      if(!tech) {
        res.sendStatus(422);
        throw Error("No tech was returned");
      } else {
        // console.log("Technology found: ---------------------------->", tech);
        techFound = tech;

        // get the user
        return User.findOne({
          where: {username: username}
        })
        .then(function(user) {
          if(!user) {
            res.sendStatus(422);
            throw Error("No user was returned");
          } else {
            // console.log("User found: ---------------------------->", user);
            // add the tech found in the tech table to the user
            return user.addTechnologies([techFound]);
          }
        })
        // send the user, with his new tech, back to the client
        .then(function() {
          return User.findOne({
            where: {username: username},
            include: [{model: Technology}, {model: Product}]
          })
          .then(function(user) {
            res.send(user);
          });
        });
      }
    })
  },


  addProductFollowToUser: function(req, res) {
    var product_name = req.query.product_name;
    var username = req.query.username;
    var productFound;

    console.log('add technology to user received...');
    console.log('product_name: ', product_name);
    console.log('username: ', username);

    // get product
    return Product.findOne({
      where: {product_name: product_name}
    })
    .then(function(product) {
      if(!product) {
        res.sendStatus(422);
        throw Error("No product was returned");
      } else {
        console.log("Product found: ---------------------------->", product);
        productFound = product;

        // get the user
        return User.findOne({
          where: {username: username}
        })
        .then(function(user) {
          if(!user) {
            res.sendStatus(422);
            throw Error("No user was returned");
          } else {
            console.log("User found: ---------------------------->", user);
            // add the tech found in the tech table to the user
            return user.addProducts([productFound]);
          }
        })
        // send the user, with his new tech, back to the client
        .then(function() {
          return User.findOne({
            where: {username: username},
            include: [{model: Technology}, {model: Product}]
          })
          .then(function(user) {
            res.send(user);
          });
        });
      }
    })
  }


};







