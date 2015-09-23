var seedSites = require('./seedSites');
try {
  var spiderLinks = require('./spiderLinks');

  module.exports = seedSites.concat(spiderLinks);
} catch (e) {
  console.log(e.message);
  module.exports = seedSites;
}

