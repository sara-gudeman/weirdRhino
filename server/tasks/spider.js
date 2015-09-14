var Promise = require('bluebird');
var cheerio = require('cheerio');
var url = require('url');
var Readable = require('stream').Readable;
var request = Promise.promisifyAll(require('request'));
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');

var cityQueue = ['http://startups-list.com'];

//Stream
var input = new Readable;
input._read = function() {};
var output = fs.createWriteStream(path.join(process.cwd(), 'spiderLinks.json'));
input.pipe(output);

var memory = {};
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
  memory[current] = true;
  var first = true;

  return request.getAsync(current)
    .spread(function(response, body) {
      var $ = cheerio.load(body);
      var links = $("a.main_link");
      for(var i = 0; i < links.length; i++) {
        if(links[i].attribs.href) {
          var site = url.parse(links[i].attribs.href);
          var siteString = "\"" + site.protocol + "//" + site.hostname + "\",";
          input.push(siteString);
        }
      }
    });
}, Promise.resolve("Seed")) 
.then(function() {
  input.push("null]");
  input.push(null);
})
.catch(function(e) {
  console.log(e.message);
});

