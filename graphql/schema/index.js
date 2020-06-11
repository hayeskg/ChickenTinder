const { buildSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql');

module.exports = buildSchema(`
type Event {
  _id: ID!
  eventName: String!
  eventDate: String!
  eventClosingDate: String!
  eventLat: String!
  eventLong: String!
  eventDistance: String!
  eventOrganiser: String!
  attendees: [String!]!
  restaurantList: ID!
  restaurants: [RestaurantTA]
  votes: [Vote]
  winner: String
  topThree: String
} 

type Vote{
  _id: ID
}

type User {
  _id: ID!
  email: String!
  password: String!
  firstName: String!
  city: String!
}

type RestaurantTA{
  _id: ID
  location_id: String
  location_string: String
  name: String
  description: String
  cuisine: [String]
  photo: String
  price: String
  ranking: String
  rating: String
  phone: String
  website: String
  address: String
  dietary_restrictions: [String]
  num_reviews: String
  positiveVotes: Int
  negativeVotes: Int
}

type RestaurantList{
  _id: ID
  list: [ID]
}

input RestaurantTAInput{
  location_id: String
  location_string: String
  name: String
  description: String
  cuisine: [String]
  photo: String
  price: String
  ranking: String
  rating: String
  phone: String
  website: String
  address: String
  dietary_restrictions: [String]
}

input EventInput{
  eventName: String!
  eventDate: String!
  eventClosingDate: String!
  eventLat: String!
  eventLong: String!
  eventDistance: String
  eventOrganiser: String!
  attendees: [String!]
}

input UserInput{
  email: String!
  password: String!
  firstName: String!
  city: String!
}

input RestaurantListInput{
  list: [ID]
}

input TripAdvisorInput {
  distance: String
  latitude: String!
  longitude: String!
}

type RootQuery{
  getEvents: [Event!]!
  getUsers: [User!]!
  getRestaurantsTripAdvisor(tripAdvisorInput: TripAdvisorInput ): [RestaurantTA]
  getRestaurantTA(restaurantID: ID!): RestaurantTA
  getRestaurantList(listID: ID!): RestaurantList
}

type RootMutation{
  createEvent(eventInput: EventInput): Event
  createUser(userInput: UserInput): User
  createRestaurantTA(restaurantTAInput: RestaurantTAInput): RestaurantTA
  createRestaurantList(restaurantListInput: RestaurantListInput): RestaurantList
}

schema{
  query: RootQuery
  mutation: RootMutation
}

`)

