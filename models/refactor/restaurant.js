const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  eventId: String,
  name: String,
  photo: String,
  price: String,
  ranking: String,
  rating: String,
  phone: String,
  website: String,
  address: String,
  cuisine: [String],
  dietRestrictions: [String]
})

module.exports = mongoose.model('Restaurant', restaurantSchema);