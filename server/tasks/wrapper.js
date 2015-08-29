var wappalyzer = require('wappalyzer');
var url = require('url');

module.exports = function(url) {
  var options = {
    url: url,
    hostname: url.parse[host],
    debug: true
  };
  wappalyzer.detectFromUrl(options, function(err, apps, appInfo) {
    console.dir(apps);
    console.dir(appInfo);
  });
};

