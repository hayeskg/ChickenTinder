const EasyGraphQLTester = require('easygraphql-tester');
const GraphQLDate = require('graphql-date');
const { GraphQLList, GraphQLID, GraphQLString } = require('graphql');
const schema = require('../graphql/schema/schema');
const { User, Event, Restaurant, Vote } = schema._typeMap;

//const tester = new EasyGraphQLTester(schema);

describe('TYPES', () => {
  describe('User', () => {
    test('checks UserType has correct fields', () => {
      let userFields = User.getFields();
      expect(Object.keys(userFields)).toEqual([
        'id',
        'name',
        'email',
        'password',
        'city',
        'eventId',
        'votes',
      ]);
    });
    test('checks each field has the correct type', () => {
      let {
        id,
        name,
        email,
        password,
        city,
        eventId,
        votes,
      } = User.getFields();
      console.log(id);
      expect(id.type).toMatchObject(GraphQLID);
      expect(name.type).toMatchObject(GraphQLString);
      expect(email.type).toMatchObject(GraphQLString);
      expect(password.type).toMatchObject(GraphQLString);
      expect(city.type).toMatchObject(GraphQLString);
      expect(eventId.type).toMatchObject(GraphQLID);
      expect(votes.type).toMatchObject(new GraphQLList(Vote));
    });
  });
  describe('Event', () => {
    test('checks EventType has correct fields', () => {
      let eventFields = Event.getFields();
      expect(Object.keys(eventFields)).toEqual([
        'id',
        'name',
        'date',
        'lat',
        'long',
        'distance',
        'organiser',
        'members',
        'restaurants',
        'votes',
        'winner',
      ]);
    });
    test('checks each field has the correct type', () => {
      let {
        id,
        name,
        date,
        lat,
        long,
        distance,
        organiser,
        members,
        restaurants,
        votes,
        winner,
      } = User.getFields();
      console.log(id);
      expect(id.type).toMatchObject(GraphQLID);
      expect(name.type).toMatchObject(GraphQLString);
      expect(date.type).toMatchObject(GraphQLDate);
      expect(lat.type).toMatchObject(GraphQLString);
      expect(long.type).toMatchObject(GraphQLString);
      expect(distance.type).toMatchObject(GraphQLString);
      expect(organiser.type).toMatchObject(GraphQLString);
      expect(members.type).toMatchObject(GraphQLString);
      expect(restaurants.type).toMatchObject(GraphQLString);
      expect(votes.type).toMatchObject(new GraphQLList(Vote));
      expect(winner.type).toMatchObject(GraphQLString);
    });
  });
  test('checks RestaurantType has correct fields', () => {
    let restaurantFields = Restaurant.getFields();
    expect(Object.keys(restaurantFields)).toEqual([
      'id',
      'eventId',
      'name',
      'description',
      'photo',
      'price',
      'ranking',
      'rating',
      'phone',
      'website',
      'address',
      'cuisine',
      'dietRestrictions',
    ]);
  });
  test('checks VoteType has correct fields', () => {
    let voteFields = Vote.getFields();
    expect(Object.keys(voteFields)).toEqual([
      'id',
      'eventId',
      'restaurantId',
      'userId',
      'positiveVote',
      'negativeVote',
    ]);
  });
});
