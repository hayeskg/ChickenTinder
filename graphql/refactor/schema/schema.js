const graphql = require('graphql');
const GraphQLDate = require('graphql-date');
const _ = require('lodash'); //is this needed?

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema
} = graphql;

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLDate },
    lat: { type: GraphQLString },
    long: { type: GraphQLString },
    distance: { type: GraphQLString },
    organiser: {
      type: UserType,
      resolve(parent, args) {
        //user id to of parent to return fields 
        //return _.find(usersdb, {id: parent.id})
      }
    },
    members: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        //return _.filter(usersdb,{eventId: parent.id})
      }
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        //return _.filter(restaurantsdb,{eventId: parent.id})
      }
    },
    votes: {
      type: new GraphQLList(VoteType),
      resolve(parent, args) {
        //return _.filter(votesdb,{eventId: parent.id})
      }
    },
    organiser: {
      type: RestaurantType,
      resolve(parent, args) {
        //return _.find(restaurantsdb, {eventId: parent.id})
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    password: { type: GraphQLString },
    eventId: { type: GraphQLID },
    votes: {
      type: new GraphQLList(VoteType),
      resolve(parent, args) {
        //return _.filter(votesdb,{userId: parent.id})
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
    ranking: { type: GraphQLID },
    rating: { type: GraphQLID },
    phone: { type: GraphQLID },
    website: { type: GraphQLID },
    address: { type: GraphQLID },
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
    restauarantId: { type: GraphQLID },
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
      }
    },
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        //return all events
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/api where usersdb/id == args.id
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        //return all users
      }
    },
    restaurant: {
      type: RestaurantType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/api where restaurantsdb/id == args.id
      }
    },
    restaurants: {
      type: new GraphQLList(RestaurantType),
      resolve(parent, args) {
        //return all restaurants
      }
    },
    vote: {
      type: VoteType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from db/api where votesdb/id == args.id
      }
    },
    votes: {
      type: new GraphQLList(VoteType),
      resolve(parent, args) {
        //return all votes
      }
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery
})