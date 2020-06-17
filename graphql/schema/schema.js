const graphql = require('graphql');
const GraphQLDate = require('graphql-date');
const {
  getTripAdvisorRestaurants,
} = require('../../utils/getTripAdvisorRestaurants');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = graphql;

const Event = require('../models/event');
const Restaurant = require('../models/restaurant');
const User = require('../models/user');
const Vote = require('../models/vote');

const {
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
} = require('../resolvers/queryResolvers');

const {
  createEvent,
  createUser,
  createRestaurant,
  createVote,
  calculateWinner,
  populateFriendsList
} = require('../resolvers/mutationResolvers');

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    endDate: { type: GraphQLDate },
    voteDate: { type: GraphQLDate },
    lat: { type: GraphQLString },
    long: { type: GraphQLString },
    distance: { type: GraphQLString },
    organiser: {
      type: UserType,
      resolve(parent, args) {
        //user id to of parent to return fields
        //return _.find(usersdb, {id: parent.id})
        return User.findById(parent.organiser);
      },
    },
    guests: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        //return _.filter(usersdb,{eventId: parent.id})
        return User.find({ eventIds: parent.id });
      },
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        //return _.filter(restaurantsdb,{eventId: parent.id})
        return Restaurant.find({ eventId: parent.id });
      },
    },
    votes: {
      type: new GraphQLList(VoteType),
      resolve(parent, args) {
        //return _.filter(votesdb,{eventId: parent.id})
        return Vote.find({ eventId: parent.id });
      },
    },
    //usersVoted
    winner: {
      type: RestaurantType,
      resolve(parent, args) {
        //return _.find(restaurantsdb, {eventId: parent.id})
        //this will get calculated when voting is finished.
        return calculateWinner(parent.id);
      },
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    uid: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    photo: { type: GraphQLString },
    eventIds: {
      type: new GraphQLList(GraphQLID),
    },
    friendsList: {
      type: new GraphQLList(GraphQLID),
      // resolve(parent, args) {
      //   return User.find({ friendsList: parent.id })
      // }
    },
    votes: {
      type: new GraphQLList(VoteType),
      resolve(parent, args) {
        //return _.filter(votesdb,{userId: parent.id})
        return Vote.find({ userId: parent.id });
      },
    },
  }),
});

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    id: { type: GraphQLID },
    eventId: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    photo: { type: GraphQLString },
    price: { type: GraphQLString },
    ranking: { type: GraphQLString },
    rating: { type: GraphQLString },
    phone: { type: GraphQLString },
    website: { type: GraphQLString },
    address: { type: GraphQLString },
    cuisine: {
      type: new GraphQLList(GraphQLString),
    },
    dietRestrictions: {
      type: new GraphQLList(GraphQLString),
    },
  }),
});

const VoteType = new GraphQLObjectType({
  name: 'Vote',
  fields: () => ({
    id: { type: GraphQLID },
    eventId: { type: GraphQLID },
    restaurantId: { type: GraphQLID },
    userId: { type: GraphQLID },
    positiveVote: { type: GraphQLInt },
    negativeVote: { type: GraphQLInt },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    event: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return getEventByID(args.id);
      },
    },
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        return getEvents();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return getUserByID(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return getUsers();
      },
    },
    restaurant: {
      type: RestaurantType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return getRestaurantByID(args.id);
      },
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        return getRestaurants();
      },
    },
    vote: {
      type: VoteType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return getVoteByID(args.id);
      },
    },
    votes: {
      type: new GraphQLList(VoteType),
      resolve(parent, args) {
        return getVotes();
      },
    },
    userByUID: {
      type: UserType,
      args: {
        uid: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return getUserByUID(args.uid);
      },
    },
    isVotingDone: {
      type: GraphQLBoolean,
      args: {
        eventId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return isVotingFinished(args.eventId);
      }
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addEvent: {
      type: EventType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        endDate: { type: new GraphQLNonNull(GraphQLDate) },
        voteDate: { type: new GraphQLNonNull(GraphQLDate) },
        lat: { type: new GraphQLNonNull(GraphQLString) },
        long: { type: new GraphQLNonNull(GraphQLString) },
        distance: { type: new GraphQLNonNull(GraphQLString) },
        organiser: { type: GraphQLID },
        guests: { type: new GraphQLList(GraphQLID) },
      },
      resolve(parent, args) {
        let input = {
          name: args.name,
          endDate: args.endDate,
          voteDate: args.vateDate,
          lat: args.lat,
          long: args.long,
          distance: args.distance,
          organiser: args.organiser,
          guests: args.guests
        };
        let createdEvent = {};
        return createEvent(input)
          .then((event) => {
            createdEvent = event;
            return getTripAdvisorRestaurants({
              distance: args.distance,
              lat: args.lat,
              long: args.long,
            }).then((restaurantsArr) => {
              let restCounter = 0;
              let createdRestaurants = [];
              let cuisineArr = [];
              let dietRestArr = [];
              return (createdRestaurants = Promise.all(
                restaurantsArr.map((restaurant) => {
                  if (restaurant.photo && restCounter < 10) {
                    if (restaurant.cuisine) {
                      cuisineArr = restaurant.cuisine.map((cuisine) => {
                        return cuisine.name;
                      });
                    }
                    if (restaurant.dietary_restrictions) {
                      dietRestArr = restaurant.dietary_restrictions.map(
                        (diet) => {
                          return diet.name;
                        }
                      );
                    }
                    let restaurantInput = {
                      eventId: createdEvent._id,
                      name: restaurant.name || 'name not available',
                      description:
                        restaurant.description || 'description not available',
                      photo:
                        restaurant.photo.images.original.url ||
                        'photo not available',
                      price: restaurant.price_level || 'price not available',
                      ranking: restaurant.ranking || 'ranking not available',
                      rating: restaurant.rating || 'rating not available',
                      phone: restaurant.phone || 'phone not available',
                      website: restaurant.website || 'website not available',
                      address: restaurant.address || 'address not available',
                      cuisine: cuisineArr || 'cuisine not available',
                      dietRestrictions:
                        dietRestArr || 'dietary restructions not available',
                    };
                    restCounter++
                    return createRestaurant(restaurantInput);
                  } else {
                    return {};
                  }
                })
              ));
            });
          })
          .then(() => {
            return createdEvent
          })
      },
    },
    addRestaurant: {
      type: RestaurantType,
      args: {
        eventId: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        photo: { type: GraphQLString },
        price: { type: GraphQLString },
        ranking: { type: GraphQLString },
        rating: { type: GraphQLString },
        phone: { type: GraphQLString },
        website: { type: GraphQLString },
        address: { type: GraphQLString },
        cuisine: {
          type: new GraphQLList(GraphQLString),
        },
        dietRestrictions: {
          type: new GraphQLList(GraphQLString),
        },
      },
      resolve(parent, args) {
        let restaurantInput = {
          eventId: args.eventId,
          name: args.name,
          description: args.description,
          photo: args.photo,
          price: args.price,
          ranking: args.ranking,
          rating: args.rating,
          phone: args.phone,
          website: args.website,
          address: args.address,
          cuisine: args.cuisine,
          dietRestrictions: args.dietRestrictions,
        };
        return createRestaurant(restaurantInput);
      },
    },
    addUser: {
      type: UserType,
      args: {
        uid: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: GraphQLString },
        email: { type: new GraphQLNonNull(GraphQLString) },
        photo: { type: GraphQLString },
      },
      resolve(parent, args) {
        let userInput = {
          uid: args.uid,
          username: args.username,
          email: args.email,
          photo: args.photo,
        };
        return createUser(userInput);
      },
    },
    addVote: {
      type: VoteType,
      args: {
        eventId: { type: new GraphQLNonNull(GraphQLID) },
        restaurantId: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        positiveVote: { type: new GraphQLNonNull(GraphQLInt) },
        negativeVote: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        let voteInput = {
          eventId: args.eventId,
          restaurantId: args.restaurantId,
          userId: args.userId,
          positiveVote: args.positiveVote,
          negativeVote: args.negativeVote,
        };
        return createVote(voteInput);
      },
    },
    getWinner: {
      type: RestaurantType,
      args: {
        eventId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return calculateWinner(args.eventId);
      },
    },
    fillFriendsList: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return populateFriendsList(args.userId);
      }
    },
    fillFriendsList: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return populateFriendsList(args.userId);
      }
    },

  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
