var models = require('../db/models');
var _ = require('underscore');
var url = require('url');
var utils = require('../helpers/queryUtils');

var Technology = models.Technology;


module.exports = {

  getTechnologyByName: function(req, res) {
    console.log('tech GET request received...');

    // get the product id from the query string
    var techName = req.query.name;
    console.log('tech name: ----------------------> ', techName);

    var result = Technology.findOne({
      where: {
        technology_name: techName
      }
    })
    .then(function(result) {
      res.set({'Content-Type': 'application/json'});
      res.status(200).send(JSON.stringify(result));
    })
    .catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  },

  searchByTechnologyName: function(req, res) {
    console.log('POST: search tech with searchString: ', req.body.searchString);

    var searchString = req.body.searchString;
    // if empty string, return empty array
    if (searchString === '') {
      res.set({'Content-Type': 'application/json'});
      res.send(JSON.stringify([]));
    } else {
      Technology.findAll({
        where: {
          technology_name: {
            $like: searchString.trim() + '%'
          }
        }
      })
      .then(function(results) {
        res.set({'Content-Type': 'application/json'});
        res.status(200).send(JSON.stringify(results));
      })
      .catch(function(err) {
        res.sendStatus(500);
        console.log(err);
      });
    }
  }

};
