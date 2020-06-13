const graphql = require('graphql');
const GraphQLDate = require('graphql-date');
const _ = require('lodash'); //is this needed?

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} = graphql;

const Event = require('../../../models/refactor/event');
const Restaurant = require('../../../models/refactor/restaurant');
const User = require('../../../models/refactor/user');
const Vote = require('../../../models/refactor/vote');

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    date: { type: GraphQLDate },
    lat: { type: GraphQLString },
    long: { type: GraphQLString },
    distance: { type: GraphQLString },
    organiser: {
      type: UserType,
      resolve(parent, args) {
        //user id to of parent to return fields 
        //return _.find(usersdb, {id: parent.id})
        return User.findById(parent.userId)
      }
    },
    members: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        //return _.filter(usersdb,{eventId: parent.id})
        return User.find({ eventId: parent.id })
      }
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        //return _.filter(restaurantsdb,{eventId: parent.id})
        return Restaurant.find({ eventId: parent.id })
      }
    },
    votes: {
      type: new GraphQLList(VoteType),
      resolve(parent, args) {
        //return _.filter(votesdb,{eventId: parent.id})
        return Restaurant.find({ eventId: parent.id })
      }
    },
    winner: {
      type: RestaurantType,
      resolve(parent, args) {
        //return _.find(restaurantsdb, {eventId: parent.id})
        //return Restaurant.find({ eventId: parent.id })
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    city: { type: GraphQLString },
    eventId: { type: GraphQLID },
    votes: {
      type: new GraphQLList(VoteType),
      resolve(parent, args) {
        //return _.filter(votesdb,{userId: parent.id})
        return Vote.find({ userId: parent.id })
      }
    },
  })
});

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  fields: () => ({
    id: { type: GraphQLID },
    eventId: { type: GraphQLID },
    name: { type: GraphQLString },
    photo: { type: GraphQLString },
    price: { type: GraphQLString },
    ranking: { type: GraphQLString },
    rating: { type: GraphQLString },
    phone: { type: GraphQLString },
    website: { type: GraphQLString },
    address: { type: GraphQLString },
    cuisine: {
      type: new GraphQLList(GraphQLString)
    },
    dietRestrictions: {
      type: new GraphQLList(GraphQLString)
    }
  })
});

const VoteType = new GraphQLObjectType({
  name: 'Vote',
  fields: () => ({
    id: { type: GraphQLID },
    eventId: { type: GraphQLID },
    restaurantId: { type: GraphQLID },
    userId: { type: GraphQLID },
    positiveVote: { type: GraphQLInt },
    negativeVote: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    event: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/api
        //return using lodash - rewrite for mongo
        //return _.find(eventsdb, {id: args.id})
        return Event.findById(args.id);

      }
    },
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        //return all events
        return Event.find();
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/api where usersdb/id == args.id
        return User.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        //return all users
        return User.find();
      }
    },
    restaurant: {
      type: RestaurantType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/api where restaurantsdb/id == args.id
        return Restaurant.findById(args.id);
      }
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        //return all restaurants
        return Restaurant.find();
      }
    },
    vote: {
      type: VoteType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/api where votesdb/id == args.id
        return Vote.findById(args.id);
      }
    },
    votes: {
      type: new GraphQLList(VoteType),
      resolve(parent, args) {
        //return all votes
        return Vote.find();
      }
    },
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addEvent: {
      type: EventType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLDate) },
        lat: { type: new GraphQLNonNull(GraphQLString) },
        long: { type: new GraphQLNonNull(GraphQLString) },
        distance: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let event = new Event({
          name: args.name,
          date: args.date,
          lat: args.lat,
          long: args.long,
          distance: args.distance
        });
        return event.save();
      }
    },
    addRestaurant: {
      type: RestaurantType,
      args: {
        eventId: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        photo: { type: GraphQLString },
        price: { type: GraphQLString },
        ranking: { type: GraphQLString },
        rating: { type: GraphQLString },
        phone: { type: GraphQLString },
        website: { type: GraphQLString },
        address: { type: GraphQLString },
        cuisine: {
          type: new GraphQLList(GraphQLString)
        },
        dietRestrictions: {
          type: new GraphQLList(GraphQLString)
        }
      },
      resolve(parent, args) {
        let restaurant = new Restaurant({
          eventId: args.eventId,
          name: args.name,
          photo: args.photo,
          price: args.price,
          ranking: args.ranking,
          rating: args.rating,
          phone: args.phone,
          website: args.website,
          address: args.address,
          cuisine: args.cuisine,
          dietRestrictions: args.dietRestrictions
        });
        return restaurant.save();
      }
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        eventId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let user = new User({
          eventId: args.eventId,
          name: args.name,
          email: args.email,
          password: args.password,
          city: args.city,
        });
        return user.save();
      }
    },
    addVote: {
      type: VoteType,
      args: {
        eventId: { type: new GraphQLNonNull(GraphQLID) },
        restaurantId: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        positiveVote: { type: new GraphQLNonNull(GraphQLInt) },
        negativeVote: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args) {
        let vote = new Vote({
          eventId: args.eventId,
          restaurantId: args.restaurantId,
          userId: args.userId,
          positiveVote: args.positiveVote,
          negativeVote: args.negativeVote
        });
        return vote.save();
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})