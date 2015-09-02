var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://root@localhost:3306/stackmatch');

var models = {
  'Technology': {
    folder: 'technologies',
    file: 'technologyModel',
  },
  'Product': {
    folder: 'products',
    file: 'productModel',
  }
};

for(var model in models) {
  module.exports[model] = sequelize.import(__dirname + '../' + models[model]['folder'] + models[model]['file']);
};

//Relationships
(function(m) {
  m.Product.hasMany(m.Technology);
  m.Technology.belongsTo(m.Product);
})(module.exports);

module.exports.sequelize = sequelize;
