const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  date: Date,
  lat: String,
  long: String,
  distance: String
})

module.exports = mongoose.model('Event', eventSchema);