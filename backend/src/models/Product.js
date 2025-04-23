const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  farmerId: String,
  name: String,
  price: String,
  imageUrl: String,
});

module.exports = mongoose.model('Product', ProductSchema);
