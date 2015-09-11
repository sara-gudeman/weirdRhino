var Promise = require('bluebird');
var cheerio = require('cheerio');
var request = Promise.promisifyAll(require('request'));
var siteQueue = require('./siteQueue');
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

var cityQueue = ['http://startups-list.com'];
var output = fs.createWriteStream(path.join(process.cwd(), 'spiderLinks.json'));
output.write("[");

request.getAsync(cityQueue.shift())
.spread(function(response, body) {
  var $ = cheerio.load(body);
  var links = $(".citylink")
  for(var i = 0; i < links.length; i++) {
    cityQueue.push(links[i].attribs.href);
  }
  
  return cityQueue;
})
.reduce(function(previous, current) {
  console.log("Current -> ", current);
  return request.getAsync(current)
    .spread(function(response, body) {
      var $ = cheerio.load(body);
      var links = $("a.main_link");
      for(var i = 0; i < links.length; i++) {
        if(links[i].attribs.href) {
          output.write(links[i].attribs.href + ",");
        }
      }
    });
}, Promise.resolve("Seed")) 
.then(function() {
  console.log("All done!");
  output.write("];");
  output.close();
})

