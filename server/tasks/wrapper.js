var wappalyzer = require('wappalyzer');
var url = require('url');

module.exports = function(site) {
  var options = {
    url: site,
    hostname: url.parse(site)['host'],
    debug: true
  };
  wappalyzer.detectFromUrl(options, function(err, apps, appInfo) {
    /**
     * apps is an array of apps
     * appInfo is a much deeper dive into each app
     */ 
  });
};

