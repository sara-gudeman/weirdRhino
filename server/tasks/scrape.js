var wrapp = require('./wrapper');
var fs = require('fs');

var testSites = ['http://facebook.com',
                 'http://www.atlassian.com',
                 'http://www.myspace.com',
                 'http://pandora.com',
                 'http://news.ycombinator.com',
                 ];

for(var i = 0; i < testSites.length; i++) {
  wrapp(testSites[i]);
}
