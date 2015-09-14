var models = require('../db/models');
var Product = models.Product;
var Technology = models.Technology;

Technology.create({
  technology_name: "test"
})
.then(function(technology){
  Product.create({
    product_name: "Test"
  })
  .then(function(product) {
    product.setTechnologies([technology]);
  })
})
.catch(function(err) {
  console.log(err);
})
