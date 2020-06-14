const Event = require('../../../models/refactor/event');
const Restaurant = require('../../../models/refactor/restaurant');
const User = require('../../../models/refactor/user');
const Vote = require('../../../models/refactor/vote');
const restaurant = require('../../../models/refactor/restaurant');

const createEvent = ({ name, date, lat, long, distance }) => {
  let event = new Event({
    name,
    date,
    long,
    lat,
    distance
  })
  return event.save();
}

const createUser = ({ eventId, name, email, password, city }) => {
  let user = new User({
    eventId,
    name,
    email,
    password,
    city
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