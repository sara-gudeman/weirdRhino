var wrapp = require('./wrapper');
var fs = require('fs');
/**
 * Maybe server hasn't spun up connection to db
 */
require('../db/database');

var testSites = ['http://facebook.com',
                 'http://www.atlassian.com',
                 'http://www.myspace.com',
                 'http://pandora.com',
                 'http://youtube.com',
                 'http://pinterest.com',
                 'http://fabric.com',
                 'http://spoonflower.com',
                 'http://twitch.com',
                 'http://wikipedia.com',
                 'http://npr.com',
                 'http://bbc.com',
                 'http://yahoo.com',
                 'http://google.com',
                 'http://crunchyroll.com',
                 'http://cmrus.com',
                 'http://blizzard.com',
                 'http://www.sfsymphony.org',
                 'https://www.linkedin.com',
                 'http://soundcloud.com',
                 ];

for(var i = 0; i < testSites.length; i++) {
  wrapp(testSites[i]);
}
