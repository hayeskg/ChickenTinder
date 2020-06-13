const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  date: Date,
  lat: String,
  long: String,
  distance: String,
  // organiser: type user
  // members:  array ot type user
  // restaurants: array of type restaurants
  // votes: array of type votes
  // winner: type restaurant
})

module.exports = mongoose.model('Event', eventSchema);