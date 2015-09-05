var wappalyzer = require('wappalyzer');
var url = require('url');
var Promise = require('bluebird');
var models = require('../db/models');

module.exports = function(requestResponses) {
  return requestResponses.map(function(response) {
    console.log("Wapping: ", response.url);
    return wapp(response);
  });
}
var wapp = function(response) {
   var options = {
    url: response.url,
    hostname: url.parse(response.url)['host'],
    debug: false
  };

  var data = {
    html: response.body,
    headers: response.headers,
    url: response.url
  }; 
  
  return new Promise(function(resolve, reject) {
    wappalyzer.detectFromHTML(options, data, function(err, apps, appInfo) {
      if(err) { 
        reject(err);
      } else if(!apps || apps.length < 1) {
        reject( new Error("Apps came back null or undefined"));
      } else {
        console.log(apps);
        resolve(apps);
      }
    });
  });
}
