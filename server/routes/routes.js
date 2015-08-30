var ProductRoutes = require('../products/productRoutes');

module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var productRouter = express.Router();

  app.use('/api/products', productRouter); // use user router for all user request

  // inject our routers into their respective route files
  require('../products/productRoutes.js')(productRouter);
};
