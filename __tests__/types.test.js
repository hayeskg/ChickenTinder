const GraphQLDate = require('graphql-date');
const {
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
} = require('graphql');
const schema = require('../graphql/schema/schema');
const { UserType } = require('../graphql/schema/typeDefs');
const { User, Event, Restaurant, Vote } = schema._typeMap;

describe('TYPES', () => {
  describe('User', () => {
    test('checks UserType has correct fields', () => {
      let userFields = User.getFields();
      console.log(userFields);
      expect(Object.keys(userFields)).toEqual([
        'id',
        'uid',
        'username',
        'email',
        'photo',
        'eventIds',
        'friendsList',
        'votes',
      ]);
    });
    test('checks each field has the correct type', () => {
      let {
        id,
        uid,
        username,
        email,
        photo,
        eventIds,
        friendsList,
        votes,
      } = User.getFields();
      expect(id.type).toMatchObject(GraphQLID);
      expect(uid.type).toMatchObject(GraphQLString);
      expect(username.type).toMatchObject(GraphQLString);
      expect(email.type).toMatchObject(GraphQLString);
      expect(photo.type).toMatchObject(GraphQLString);
      expect(friendsList.type).toMatchObject(new GraphQLList(UserType));
      expect(eventIds.type).toMatchObject(new GraphQLList(GraphQLID));
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
      } = Event.getFields();
      expect(id.type).toMatchObject(GraphQLID);
      expect(name.type).toMatchObject(GraphQLString);
      expect(date.type).toMatchObject(GraphQLDate);
      expect(lat.type).toMatchObject(GraphQLString);
      expect(long.type).toMatchObject(GraphQLString);
      expect(distance.type).toMatchObject(GraphQLString);
      expect(organiser.type).toMatchObject(User);
      expect(members.type).toMatchObject(new GraphQLList(User));
      expect(restaurants.type).toMatchObject(GraphQLList(Restaurant));
      expect(votes.type).toMatchObject(new GraphQLList(Vote));
      expect(winner.type).toMatchObject(Restaurant);
    });
  });
  describe('Restaurant', () => {
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
    test('checks fields have the correct type', () => {
      let {
        id,
        eventId,
        name,
        description,
        photo,
        price,
        ranking,
        rating,
        phone,
        website,
        address,
        cuisine,
        dietRestrictions,
      } = Restaurant.getFields();
      expect(id.type).toMatchObject(GraphQLID);
      expect(eventId.type).toMatchObject(GraphQLID);
      expect(name.type).toMatchObject(GraphQLString);
      expect(description.type).toMatchObject(GraphQLString);
      expect(photo.type).toMatchObject(GraphQLString);
      expect(price.type).toMatchObject(GraphQLString);
      expect(ranking.type).toMatchObject(GraphQLString);
      expect(rating.type).toMatchObject(GraphQLString);
      expect(phone.type).toMatchObject(GraphQLString);
      expect(website.type).toMatchObject(GraphQLString);
      expect(address.type).toMatchObject(GraphQLString);
      expect(cuisine.type).toMatchObject(new GraphQLList(GraphQLString));
      expect(dietRestrictions.type).toMatchObject(
        new GraphQLList(GraphQLString)
      );
    });
  });
  describe('Vote', () => {
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
    test('checks fields have the correct type', () => {
      let {
        id,
        eventId,
        restaurantId,
        userId,
        positiveVote,
        negativeVote,
      } = Vote.getFields();
      expect(id.type).toEqual(GraphQLID);
      expect(eventId.type).toEqual(GraphQLID);
      expect(restaurantId.type).toEqual(GraphQLID);
      expect(userId.type).toEqual(GraphQLID);
      expect(positiveVote.type).toEqual(GraphQLInt);
      expect(negativeVote.type).toEqual(GraphQLInt);
    });
  });
});
