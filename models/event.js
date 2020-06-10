const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventDate: {
    type: String,
    required: true
  },
  eventClosingDate: {
    type: String,
    required: true
  },
  eventLat: {
    type: String,
    required: true
  },
  eventLong: {
    type: String,
    required: true
  },
  eventDistance: {
    type: String,
    required: true
  },
  eventOrganiser: {
    type: String,
    required: true
  },
  attendees: [{
    type: String,
    required: true
  }],
  restaurantList: {
    type: Schema.Types.ObjectId,
    ref: 'RestaurantList'
  },
  votes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Vote'
    }
  ],
  winner: {
    type: String,
    required: false
  },
  topThree: {
    type: String,
    required: false
  }

});

module.exports = mongoose.model('Event', eventSchema)

