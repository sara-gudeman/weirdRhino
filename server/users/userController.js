var jwt = require('jwt-simple');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
var utils = require('../helpers/queryUtils');

var models = require('../db/models');
var User = models.User;
var Technology = models.Technology;
var Product = models.Product;


var secret = 'loudNoises!';


module.exports = {

  login: function(req, res) {
    // query db for user by name
    utils.getUserByName(req.body.username)
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
      if(isValid) {
        var payload = {
          username: user.username,
          date: Date.now()
        }
        user.token = jwt.encode(payload, secret);
        user.save()
        .then(function(user) {
          delete user.hashed_password;
          res.send(JSON.stringify(user));
        })
        .catch(function(e) {
          res.sendStatus(500);
          console.log("Error updating token: ", e.message);
        });
      } else {
        res.sendStatus(401);
        throw Error("Incorrect Login attempt");
      }
    })
    .catch(function(e) {
      if(!res.headersSent) {
        res.sendStatus(500);
      }
      console.log(e.message);
    });
  },


  signup: function(req, res) {
    // query db for user by name
    utils.getUserByName(req.body.username)
    .then(function(user) {
      if(user) {
        res.sendStatus(422);
        throw Error("Username taken");
        res.sendStatus(500);
      } else {
        return bcrypt.hashAsync(req.body.password, null, null);
      }
    })
    .then(function(hash) {
      var payload = {
        username: req.body.username,
        date: Date.now()
      }
      //create the user record
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
    // send 401 if bad token
    if(!req.body.token) {
      res.sendStatus(401);
      return;
    }
    // decrypt token
    var token = jwt.decode(req.body.token, secret);
    //check if token is expired
    if(Math.floor((Date.now() - token.date) / (1000*60*60*24)) > 7) {
      res.sendStatus(401);
      console.log("Expired token: ", token);
      return;
    }

    // query db by token username
    utils.getUserByName(token.username)
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

    // check if the user-entered tech exists in DB tech table
    return Technology.findOne({
      where: {technology_name: technology_name}
    })
    .then(function(tech) {
      if(!tech) {
        res.sendStatus(422);
        throw Error("No tech was returned");
      } else {
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
            // add the tech found in the tech table to the user
            return user.addTechnologies([techFound]);
          }
        })
        // send the user, with his new tech, back to the client
        .then(function() {
          return utils.getUserByName(username)
          .then(function(user) {
            res.send(user);
          });
        });
      }
    })
  },


  removeTechOnUser: function(req, res) {

    var technology_name = req.body.technology_name;
    var username = req.body.username;
    var techFound;

    // check if the user-entered tech exists in DB tech table
    return Technology.findOne({
      where: {technology_name: technology_name}
    })
    .then(function(tech) {
      if(!tech) {
        res.sendStatus(422);
        throw Error("No tech was returned");
      } else {
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
            // add the tech found in the tech table to the user
            return user.removeTechnologies([techFound]);
          }
        })
        // send the user, with his new tech, back to the client
        .then(function() {
          return utils.getUserByName(username)
          .then(function(user) {
            res.send(user);
          });
        });
      }
    })
  },


  updateUserProductFollow: function(req, res) {
    var product_name = req.body.product_name;
    var username = req.body.username;
    var isFollowing = req.body.isFollowing;
    var productFound;

    // get product
    return Product.findOne({
      where: {product_name: product_name}
    })
    .then(function(product) {
      if(!product) {
        res.sendStatus(422);
        throw Error("No product was returned");
      } else {
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
            // if user is already following, delete tech
            if (isFollowing) {
              product.product_followers --;
              product.save();
              return user.removeProducts(productFound);
            } else {
              // add the product found in the product table to the user
              product.product_followers ++;
              product.save();
              return user.addProducts([productFound]);
            }
          }
        })
        // send the user, with his new tech, back to the client
        .then(function() {
          return utils.getUserByName(username)
          .then(function(user) {
            res.send(JSON.stringify(user));
          });
        });
      }
    })
    .catch(function(e) {
      console.log("Error in userControllers updateUserProductFollow: ", e.message);
    });
  },

  addUserGithubHandle: function(req, res) {
    var token = jwt.decode(req.body.token, secret);

    // query db for user by username
    utils.getUserByName(req.body.username)
    .then(function(user) {
      if(!req.body.token === user.token) {
        throw Error("Invalid token");
      }
      user.github_handle = req.body.githubHandle;
      user.save();
    })
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(e) {
      if(!res.headersSent) {
        res.sendStatus(500);
      }
      console.log(e.message);
    });
  }
};







