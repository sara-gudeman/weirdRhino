var models = require('../db/models');
var Technology = models.Technology;
var Product = models.Product;

Technology.create({
  technology_name: "TEST",
  site: "http://example.com/test",
  category: "TESTING",
}).then(function(tech) {
    Product.create({
      product_name: "TEST PRODUCT",
      scrape_date: Date.now(),
      product_url: "http://example.com/product/test",
    }).then(function(product) {    
      product.setTechnologies(tech);
      product.save();
      tech.save();
    });
});
