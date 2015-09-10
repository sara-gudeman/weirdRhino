
module.exports = function (app, express) {
  // Express 4 allows us to use multiple routers with their own configurations
  var productRouter = express.Router();
  var authRouter = express.Router();

  app.use('/api/products', productRouter);
  app.use('/api/users', authRouter);

  // inject our routers into their respective route files
  require('../products/productRoutes.js')(productRouter);
  require('../users/userRoutes.js')(authRouter);
};
