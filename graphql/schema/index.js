const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Event {
  _id: ID!
  eventName: String!
  eventLocation: String!
  members: [User!]!
}

type User {
  _id: ID!
  email: String!
  firstName: String!
  city: String!
}

type Restaurant{
  _id: ID!
  venueName: String!
  venueImage: String!
  venueCity: String!
  positiveVotes: Int!
  negativeVotes: Int!
}

input EventInput{
  eventName: String!
  eventLocation: String!
  members: [ID!]!
}

input UserInput{
  email: String!
  firstName: String!
  city: String!
}

input RestaurantInput{
  venueName: String!
  venueImage: String!
  venueCity: String!
  positiveVotes: Int!
  negativeVotes: Int!
}

type RootQuery{
  getEvents: [Event!]!
  getUsers: [User!]!
  getRestaurant: Restaurant
}

type RootMutation{
  createEvent(eventInput: EventInput): Event
  createUser(userInput: UserInput): User
  createRestaurant(restaurantInput: RestaurantInput): Restaurant
}

schema{
  query: RootQuery
  mutation: RootMutation
}

`)