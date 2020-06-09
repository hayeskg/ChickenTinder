const Event = require('../../models/event');
const User = require('../../models/user');
const Restaurant = require('../../models/restaurant');
const RestaurantTA = require('../../models/restaurantTA');
const RestaurantTAList = require('../../models/restaruantTAList');

const axios = require('axios');


//TripAdvisor API request options.
const options = {
  headers: {
    "X-RapidAPI-Host": process.env.TA_HOST,
    "X-RapidAPI-Key": process.env.TA_KEY
  },
  params: {
    "restaurant_tagcategory_standalone": "10591",
    "lunit": "mi",
    "limit": "10",
    "currency": "GBP",
    "lang": "en_GB",
    "location_id": "186411"
  }
};

module.exports = {
  //Queries
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
  getRestaurantsTripAdvisor: () => {
    return axios
      .get(
        "https://tripadvisor1.p.rapidapi.com/restaurants/list",
        options,
      )
      .then((res) => {
        let restList = [...res.data.data]
        return restList.map(restaurant => {
          let photoUrl = '';
          let cuisineArr = [];
          let dietArr = [];
          if (restaurant.cuisine) {
            cuisineArr = restaurant.cuisine.map(cuisineObj => {
              return cuisineObj.name;
            })
          }
          if (restaurant.photo) {
            photoUrl = restaurant.photo.images.original.url;
          }
          if (restaurant.dietary_restrictions) {
            dietArr = restaurant.dietary_restrictions.map(dietObj => {
              return dietObj.name;
            })
          }
          const restaurantTA = {
            location_id: restaurant.location_id,
            location_string: restaurant.location_string,
            name: restaurant.name,
            description: restaurant.description,
            cuisine: cuisineArr,
            photo: photoUrl,
            price: restaurant.price,
            ranking: restaurant.ranking,
            rating: restaurant.rating,
            phone: restaurant.phone,
            website: restaurant.website,
            address: restaurant.address,
            dietary_restrictions: dietArr
          }
          //this.createRestaurantTA(restaurantTA);
          return restaurantTA;

        })
      });
  },
  getRestaurantTA: (args) => {
    return RestaurantTA.findById(args.restaurantID)
      .then(restaurant => {
        return {
          ...restaurant._doc,
          _id: restaurant._id
        }
      })
  },
  getRestaurantList: (args) => {
    return RestaurantTAList.findById(args.listID)
      .then(restaurantList => {
        return {
          ...restaurantList._doc,
          _id: restaurantList._id
        }
      })
  },
  ///Mutations
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

  createRestaurantTA: (args) => {
    const { location_id, location_string, name, description, cuisine, photo, price, ranking, rating, phone, website, address, dietary_restrictions } = args.restaurantTAInput;
    const restaurantTA = new RestaurantTA({
      location_id: location_id,
      location_string: location_string,
      name: name,
      description: description,
      cuisine: [...cuisine],
      photo: photo,
      price: price,
      ranking: ranking,
      rating: rating,
      phone: phone,
      website: website,
      address: address,
      dietary_restrictions: [...dietary_restrictions]
    })
    return restaurantTA.save()
      .then((restaurantTA) => {
        return { ...restaurantTA._doc, _id: restaurantTA._id }
      })
  },
  createRestaurantList: (args) => {
    const newList = new RestaurantTAList({
      list: [...args.restaurantListInput.list]
    })
    return newList.save()
      .then((list) => {
        return { ...list._doc, _id: list._id }
      })
  }
}


