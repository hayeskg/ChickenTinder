const graphql = require('graphql');
const GraphQLDate = require('graphql-date');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = graphql;

const Event = require('../models/event');
const Restaurant = require('../models/restaurant');
const User = require('../models/user');
const Vote = require('../models/vote');

const { calculateWinner } = require('../resolvers/mutationResolvers');

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
        return User.findById(parent.organiser);
      },
    },
    guests: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({ eventIds: parent.id });
      },
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        return Restaurant.find({ eventId: parent.id });
      },
    },
    votes: {
      type: new GraphQLList(VoteType),
      resolve(parent, args) {
        return Vote.find({ eventId: parent.id });
      },
    },
    winner: {
      type: RestaurantType,
      resolve(parent, args) {
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
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({ friendsList: parent.id })
      }
    },
    votes: {
      type: new GraphQLList(VoteType),
      resolve(parent, args) {
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

module.exports = { UserType, EventType, RestaurantType, VoteType };