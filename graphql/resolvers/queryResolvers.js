const Event = require('../models/event');
const Restaurant = require('../models/restaurant');
const User = require('../models/user');
const Vote = require('../models/vote');

const getEventByID = (id) => {
  return Event.findById(id).then((event) => {
    return event;
  });
};

const getEvents = () => {
  return Event.find().then((events) => {
    return events;
  });
};

const getUserByID = (id) => {
  return User.findById(id).then((user) => {
    return user;
  });
};

const getUsers = () => {
  return User.find().then((users) => {
    return users;
  });
};

const getRestaurantByID = (id) => {
  return Restaurant.findById(id).then((restaurant) => {
    return restaurant;
  });
};

const getRestaurants = () => {
  return Restaurant.find().then((restaurants) => {
    return restaurants;
  });
};

const getVoteByID = (id) => {
  return Vote.findById(id).then((vote) => {
    return vote;
  });
};

const getVotes = () => {
  return Vote.find().then((votes) => {
    return votes;
  });
};

const getUserByUID = (uid) => {
  return User.find({ uid: uid }).then((user) => {
    console.log(user);
    return user[0];
  });
};


const isVotingFinished = (eventId) => {
  //retrieve event, log number of users
  let userNo = 0;
  getEventByID(eventId).then(event => {
    userNo = event.guests + 1;
    console.log(userNo)
  })

  //retrieve votes by eventID, log number

  //compare value

  //if not equal return false

  //if equal, call calculateWinner

  //return winning restaurant
}


module.exports = {
  getEventByID,
  getEvents,
  getUserByID,
  getUsers,
  getRestaurantByID,
  getRestaurants,
  getVoteByID,
  getVotes,
  getUserByUID,
  isVotingFinished
};
