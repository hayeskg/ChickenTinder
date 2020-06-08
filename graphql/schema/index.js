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
}

input EventInput{
  eventName: String!
  eventLocation: String!
  members: ID!
}

input UserInput{
  email: String!
  firstName: String!
  city: String!
}

type RootQuery{
  events: [Event!]!
  users: [Users!]!
}

type RootMutation{
  createEvent(eventInput: EventInput): Event
  createUser(userInput: UserInput): User
}

schema{
  query: RootQuery
  mutation: RootMutation
}


`)