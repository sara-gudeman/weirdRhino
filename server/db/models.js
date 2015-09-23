var Sequelize = require('sequelize');

/**
 * Connect to local MySQL in dev,
 */

var PRODUCTION_OPTIONS = {
  dialect: 'mysql',
  protocol: 'mysql'
}

// new google cloud mySQL DB
// newDbURL = "mysql://weirdrhino:weirdrhino-HR31@173.194.250.101:3306/stackmatch"

var TESTING_OPTIONS = {
  dialect: 'mysql'
}

var setDbUrl = function() {
  if (process.env['DATABASE_URL']) {
    return process.env['DATABASE_URL']
  } else if (process.env['TESTING']) {
    return 'mysql://@root@localhost:3306/stackmatch_test';
  } else {
    return 'mysql://root@localhost:3306/stackmatch';
  }
}

var setOptions = function() {
  if (process.env['DATABASE_URL']) {
    return PRODUCTION_OPTIONS;
  } else if (process.env['TESTING']) {
    return TESTING_OPTIONS;
  } else {
    return {};
  }
}

var DB_URL = setDbUrl();
var OPTIONS = setOptions();
// var DB_URL = (process.env['DATABASE_URL']) ? process.env['DATABASE_URL'] : 'mysql://root@localhost:3306/stackmatch';
// var OPTIONS = (process.env['DATABASE_URL']) ? PRODUCTION_OPTIONS : {};
console.log("Connecting to db at ", DB_URL);
console.log("Database options: ", OPTIONS);

var sequelize = new Sequelize(DB_URL, OPTIONS);
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
  },
  'User': {
    folder: 'users',
    file: 'userModel'
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

  m.User.belongsToMany(m.Technology, {through: 'UserTechnologies'});
  m.Technology.belongsToMany(m.User, {through: 'UserTechnologies'});

  m.User.belongsToMany(m.Product, {through: 'UserProducts'});
  m.Product.belongsToMany(m.User, {through: 'UserProducts'});

  //One company, many products
  m.Company.hasMany(m.Product);
  m.Product.belongsTo(m.Company);

  //Sync here after relationships are added
  m.Technology.sync();
  m.Product.sync();
  m.Company.sync();
  m.User.sync();
  sequelize.sync(); //Creates join table
})(module.exports);

module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
