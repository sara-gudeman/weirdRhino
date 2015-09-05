var Sequelize = require('sequelize');
var sequelize = new Sequelize('mysql://root@localhost:3306/stackmatch', {logging: true});
var models = {
  'Technology': {
    folder: 'technologies',
    file: 'technologyModel',
  },
  'Product': {
    folder: 'products',
    file: 'productModel',
  },
  'Company': {
    folder: 'companies',
    file: 'companyModel',
  }
};

for(var model in models) {
  module.exports[model] = sequelize.import(__dirname + '/../' + models[model]['folder'] + "/" + models[model]['file']);
};

//Relationships
(function(m) {
  //Many to many products and technologies
  m.Product.belongsToMany(m.Technology, {through: 'ProductTechnologies'});
  m.Technology.belongsToMany(m.Product, {through: 'ProductTechnologies'});

  //One company, many products
  m.Company.hasMany(m.Product);
  m.Product.belongsTo(m.Company);

  //Sync here after relationships are added
  m.Technology.sync();
  m.Product.sync();
  m.Company.sync();
  sequelize.sync(); //Creates join table
})(module.exports);

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
