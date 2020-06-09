const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantTASchema = new Schema({
  location_id: {
    type: String,
    required: false
  },
  location_string: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  cuisine: {
    type: [String],
    required: false
  },
  photo: {
    type: String,
    required: false
  },
  price: {
    type: String,
    required: false
  },
  ranking: {
    type: String,
    required: false
  },
  rating: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false
  },
  website: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  dietary_restrictions: {
    type: [String],
    required: false
  }

});

module.exports = mongoose.model('RestaurantTA', restaurantTASchema)