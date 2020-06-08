const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  venueName: {
    type: String,
    required: true
  },
  venueImage: {
    type: String,
    required: true
  },
  venueCity: {
    type: String,
    required: true,
  },
  positiveVotes: {
    type: Number,
    required: true,
  },
  negativeVotes: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model('Restaurant', restaurantSchema)