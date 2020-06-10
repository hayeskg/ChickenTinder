const { buildSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql');

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
  getRestaurant(restaurantID: ID!): Restaurant
  getRestaurants: [Restaurant!]!
  getRestaurantsTripAdvisor(tripAdvisorInput: TripAdvisorInput ): [RestaurantTA]
  getRestaurantTA(restaurantID: ID!): RestaurantTA
  getRestaurantList(listID: ID!): RestaurantList
}

type RootMutation{
  createEvent(eventInput: EventInput): Event
  createUser(userInput: UserInput): User
  createRestaurant(restaurantInput: RestaurantInput): Restaurant
  createRestaurantTA(restaurantTAInput: RestaurantTAInput): RestaurantTA
  createRestaurantList(restaurantListInput: RestaurantListInput): RestaurantList
}

schema{
  query: RootQuery
  mutation: RootMutation
}

`)

