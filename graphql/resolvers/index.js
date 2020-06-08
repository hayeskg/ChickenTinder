const Event = require('../../models/event');
const User = require('../../models/user');
const Restaurant = require('../../models/restaurant');

const axios = require('axios');


//TripAdvisor API request options.
const options = {
  headers: {
    "X-RapidAPI-Host": "tripadvisor1.p.rapidapi.com",
    "X-RapidAPI-Key": "6b17fe9061msh5a7cdb140636ba6p153973jsnecdfa2f4a02a"
  },
  params: {
    "restaurant_tagcategory_standalone": "10591",
    "lunit": "km",
    "restaurant_tagcategory": "10591",
    "limit": "20",
    "currency": "GBP",
    "lang": "en_US",
    "location_id": "11687380"
  }
};

module.exports = {
  getEvents: () => {
    return Event.find()
      .then(events => {
        return events.map(event => {
          return {
            ...event._doc,
            _id: event._id,
            members: event._doc.members
          }
        })
      })
      .catch(err => {
        throw err;
      })
  },
  getUsers: () => {
    return User.find()
      .then(users => {
        return users.map(user => {
          return {
            ...user._doc,
            _id: user._id
          }
        })
      })
  },
  getRestaurant: (args) => {
    return Restaurant.findOne({ _id: args.restaurantId })
      .then(restaurant => {
        return {
          ...restaurant._doc,
          _id: restaurant._id
        }
      })
  },
  getRestaurants: () => {
    return Restaurant.find()
      .then(restaurants => {
        return restaurants.map(restaurant => {
          return {
            ...restaurant._doc,
            _id: restaurant._id
          }
        })
      })
  },
  createUser: (args) => {
    const user = new User({
      email: args.userInput.email,
      firstName: args.userInput.firstName,
      city: args.userInput.city
    })
    return user.save()
      .then((user) => {
        return { ...user._doc, _id: user.id }
      })
  },
  createEvent: (args) => {
    const event = new Event({
      eventName: args.eventInput.eventName,
      eventLocation: args.eventInput.eventLocation,
      members: [...args.eventInput.members]
    });
    let createdEvent;
    return event
      .save()
      .then(savedEvent => {
        let users = [];
        users = savedEvent.members.map(id => {
          return User.findById(id)
            .then(user => {
              return {
                ...user._doc,
                _id: user.id
              }
            })
        })
        createdEvent = {
          ...savedEvent._doc,
          _id: savedEvent._doc._id.toString(),
          members: [...users]
        }
        console.log(createdEvent)
        return createdEvent;
      })
      .then()
      .catch(err => {
        console.log(err);
        throw err;
      });
  },
  createRestaurant: (args) => {
    const restaurant = new Restaurant({
      venueName: args.restaurantInput.venueName,
      venueImage: args.restaurantInput.venueImage,
      venueCity: args.restaurantInput.venueCity,
      positiveVotes: args.restaurantInput.positiveVotes,
      negativeVotes: args.restaurantInput.negativeVotes
    })
    return restaurant.save()
      .then((restaurant) => {
        return { ...restaurant._doc, _id: restaurant.id }
      })
  },
  getRestaurantsTripAdvisor: () => {
    return axios
      .get(
        "https://tripadvisor1.p.rapidapi.com/restaurants/list",
        options,
      )
      .then((res) => {
        let restList = [...res.data.data]
        return restList.map(restaurant => {
          return {
            location_id: restaurant.location_id,
            location_string: restaurant.location_string,
            name: restaurant.name,
            description: restaurant.description
          }
        })
      });
  }
}


