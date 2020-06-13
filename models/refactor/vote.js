const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  eventId: String,
  restaurantId: String,
  userId: String,
  positiveVote: Number,
  negativeVote: Number,

})

module.exports = mongoose.model('Vote', voteSchema);