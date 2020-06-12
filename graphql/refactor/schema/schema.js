const graphql = require('graphql');
const GraphQLDate = require('graphql-date');

const { GraphQLOpjectType, GraphQLID, GraphQLString } = graphql;

const UserType = new GraphQLOpjectType({
  name: 'Event ',
  fields: () => ({
    id: { type: GraphQLID },
    date: { type: GraphQLDate },
    lat: { type: GraphQLString },
    long: { type: GraphQLString },
    distance: { type: GraphQLString },
    // organiser: { type: UserType },
    // members: [{ type: UserType }],
    // restaurants: [{ type: RestaurantType }],
    // votes: { type: VoteType },
    // winner: { type: RestaurantType },
  })
});