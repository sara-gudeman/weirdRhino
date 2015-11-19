var wappalyzer = require('wappalyzer');
var url = require('url');
var Promise = require('bluebird');
var models = require('../db/models');

/**
 * Promisified wappalyzer. Bluebird was having trouble promisifying
 * it so this was manally done.
 *
 * @params String products
 * @returns Promise
 */
module.exports = function(site) {
   var options = {
    url: site,
    hostname: url.parse(site)['host'],
    debug: false
  };
  return new Promise(function(resolve, reject) {
    wappalyzer.detectFromUrl(options, function(err, apps, appInfo) {
      if(err) { 
        reject(err);
      } else { 
        resolve(apps, apps);
      }
    });
  });
}
