const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  endDate: Date,
  voteDate: Date,
  lat: String,
  long: String,
  distance: String,
  organiser: String,
  guests: [String]

})

module.exports = mongoose.model('Event', eventSchema);