const Event = require('../models/event');
const Restaurant = require('../models/restaurant');
const User = require('../models/user');
const Vote = require('../models/vote');

const { listAllUsers } = require("../../authentication/listAllUsers");

const createEvent = ({ name, endDate, voteDate, lat, long, distance, organiser, guests }) => {
  let event = new Event({
    name,
    endDate,
    voteDate,
    long,
    lat,
    distance,
    organiser,
    guests
  })
  return event.save();
}

const createUser = ({ uid, username, email, photo }) => {
  let user = new User({
    uid,
    username,
    email,
    photo
  });

  return user.save();
}

const createRestaurant = ({ eventId, name, description, photo, price, ranking, rating, phone, website, address, cuisine, dietRestrictions }) => {
  let restaurant = new Restaurant({
    eventId,
    name,
    description,
    photo,
    price,
    ranking,
    rating,
    phone,
    website,
    address,
    cuisine,
    dietRestrictions
  })
  return restaurant.save();
}

const createVote = ({ eventId, restaurantId, userId, positiveVote, negativeVote }) => {
  let vote = new Vote({
    eventId,
    restaurantId,
    userId,
    positiveVote,
    negativeVote
  })
  return vote.save();
}



module.exports = {
  createEvent,
  createUser,
  createRestaurant,
  createVote
}