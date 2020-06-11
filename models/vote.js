const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const voteSchema = new Schema({
  eventRef: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  restaurantRef: {
    type: Schema.Types.ObjectId,
    ref: 'RestaurantTA'
  },
  positiveVote: {
    type: Number,
    required: true
  },
  negativeVote: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Vote', voteSchema)