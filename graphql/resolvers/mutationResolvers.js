const Event = require('../models/event');
const Restaurant = require('../models/restaurant');
const User = require('../models/user');
const Vote = require('../models/vote');

//const { listAllUsers } = require("../../authentication/listAllUsers");
const { getVotesByRestaurant } = require('../../utils/getVotesByRestaurant');
const { voteCounter } = require('../../utils/voteCounter');
const { sortWinner } = require('../../utils/sortWinner');
const {
  getUserByID,
  getUsers,
  getRestaurantByID,
  getEventByID
} = require('../resolvers/queryResolvers');

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
  //update user eventIDs organiser + guests
  return event.save()
    .then((event) => {
      let attendeesIDs = [];
      attendeesIDs.push(event.organiser);
      event.guests.map(guest => {
        attendeesIDs.push(guest);
      });
      return Promise.all(attendeesIDs.map(userID => {
        let allEventIds = [event._id];
        User.findById(userID)
          .then(user => {
            if (user.eventIds) {
              user.eventIds.map(ID => {
                allEventIds.push(ID)
              })
            }
          })
          .then(() => {
            return User.findByIdAndUpdate(
              { _id: userID },
              { eventIds: allEventIds }
            )
          })
      }))
    })
    .then(() => {
      return event;
    })

}

const createUser = ({ uid, username, email, photo }) => {
  let user = new User({
    uid,
    username,
    email,
    photo
  });
  return user.save()
    .then(user => {
      return populateFriendsList(user._id)
    })
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

const calculateWinner = (eventId) => {
  let winnerRestaurant = { msg: "No votes yet!" }
  return getEventByID(eventId).then((event) => {
    let groupSize = event.guests.length + 1
    return Vote.find({ eventId: event.id }).then((votes) => {
      let votesByRestaurant = getVotesByRestaurant(votes);
      let scoresArr = [];
      votesByRestaurant.map((vote) => {
        let { totalPos, totalNeg, eventId, restaurantId } = vote;
        let totalVotes = totalPos + totalNeg;
        let scoreObj = {};
        scoreObj = voteCounter(
          groupSize,
          totalVotes,
          totalPos,
          totalNeg,
          restaurantId,
          eventId
        );
        scoresArr.push(scoreObj);
      });
      let winningVote = sortWinner(scoresArr);
      return getRestaurantByID(winningVote[0].restaurantId).then((winner) => {
        winnerRestaurant = winner;
        return Event.findByIdAndUpdate(
          { _id: winnerRestaurant.eventId },
          { winner: winnerRestaurant._id }
        )
      })
        .then(() => {
          return winnerRestaurant;
        })
    });
  });
};

const populateFriendsList = (userId) => {
  let friendsArr = [];
  return getUsers().then(users => {
    userArr = users.map(user => {
      if (user._id.toString() !== userId.toString()) {
        friendsArr.push(user._id);
      }
    })
    return User.findByIdAndUpdate(
      { _id: userId },
      { friendsList: friendsArr }
    ).then(() => {
      return getUserByID(userId);
    })
  })
}



module.exports = {
  createEvent,
  createUser,
  createRestaurant,
  createVote,
  calculateWinner,
  populateFriendsList
}