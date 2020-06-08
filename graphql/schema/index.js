const { buildSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLSchema } = require('graphql');
const axios = require('axios');

// const RestaurantType = new GraphQLObjectType({
//   name: 'RestaurantTA',
//   fields: () => ({
//     location_id: { type: GraphQLString },
//     location_string: { type: GraphQLString },
//     name: { type: GraphQLString },
//     description: { type: GraphQLString },
//   }),
// });

// const options = {
//   headers: process.env.headers,
// };

// const options = {
//   headers: {
//     'X-RapidAPI-Host': 'tripadvisor1.p.rapidapi.com',
//     'X-RapidAPI-Key': '6b17fe9061msh5a7cdb140636ba6p153973jsnecdfa2f4a02a',
//   },
// };

// const getRestaurantsTripAdvisor = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     restaurants: {
//       type: new GraphQLList(RestaurantType),
//       resolve(parent, args) {
//         console.log('in axios')
//         return axios
//           .get(
//             'https://tripadvisor1.p.rapidapi.com/restaurants/list?restaurant_tagcategory_standalone=10591&lunit=km&restaurant_tagcategory=10591&limit=30&currency=USD&lang=en_US&location_id=293919',
//             options
//           )
//           .then((res) => res.data.data);
//       },
//     },
//   },
// });

// module.exports = new GraphQLSchema({
//   query: getRestaurantsTripAdvisor,
// });

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
  _id: ID!
  location_id: String!
  location_string: String!
  name: String!
  description: String!
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
  getRestaurant(restaurantID: ID!): Restaurant
  getRestaurants: [Restaurant!]!
  getRestaurantsTripAdvisor: [RestaurantTA!]!
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