const { getVotesByRestaurant } = require('./getVotesByRestaurant');


describe('transforms an array of vote objects into votes per restaurant objects', () => {
  test('takes an array of objects, returns an array of objects', () => {
    expect(getVotesByRestaurant([])).toEqual([]);
  })
  test('takes an array of 2 vote objects for different restaurants, returns correctly', () => {
    let voteObj1 =
    {
      _id: "5ee38256594aa40017024b14",
      restaurantId: "5061706127732050697a7a61",
      eventId: "5ee23fa0976ee6001793e49f",
      positiveVote: 1,
      negativeVote: 0
    }
    let voteObj2 = {
      _id: "5ee38313594aa40017024b15",
      restaurantId: "5ee23f9d976ee6001793e481",
      eventId: "5ee23fa0976ee6001793e49f",
      positiveVote: 1,
      negativeVote: 0
    }
    let input = [voteObj1, voteObj2];

    let totalObj1 = {
      restaurantId: "5061706127732050697a7a61",
      eventId: "5ee23fa0976ee6001793e49f",
      totalPos: 1,
      totalNeg: 0
    }
    let totalObj2 = {
      restaurantId: "5ee23f9d976ee6001793e481",
      eventId: "5ee23fa0976ee6001793e49f",
      totalPos: 1,
      totalNeg: 0
    }
    let output = [totalObj1, totalObj2]

    expect(getVotesByRestaurant(input)).toEqual(output);
  })
  test('takes an array of 2 vote objects (+,+) for same restaurant, returns correctly', () => {
    let voteObj1 =
    {
      _id: "5ee38256594aa40017024b14",
      restaurantId: "5061706127732050697a7a61",
      eventId: "5ee23fa0976ee6001793e49f",
      positiveVote: 1,
      negativeVote: 0
    }
    let voteObj2 = {
      _id: "5ee38313594aa40017024b15",
      restaurantId: "5061706127732050697a7a61",
      eventId: "5ee23fa0976ee6001793e49f",
      positiveVote: 1,
      negativeVote: 0
    }
    let input = [voteObj1, voteObj2];

    let totalObj1 = {
      restaurantId: "5061706127732050697a7a61",
      eventId: "5ee23fa0976ee6001793e49f",
      totalPos: 2,
      totalNeg: 0
    }

    let output = [totalObj1]

    expect(getVotesByRestaurant(input)).toEqual(output);
  })
  test('takes an array of 2 vote objects (+,-) for same restaurant, returns correctly', () => {
    let voteObj1 =
    {
      _id: "5ee38256594aa40017024b14",
      restaurantId: "5061706127732050697a7a61",
      eventId: "5ee23fa0976ee6001793e49f",
      positiveVote: 1,
      negativeVote: 0
    }
    let voteObj2 = {
      _id: "5ee38313594aa40017024b15",
      restaurantId: "5061706127732050697a7a61",
      eventId: "5ee23fa0976ee6001793e49f",
      positiveVote: 0,
      negativeVote: 1
    }
    let input = [voteObj1, voteObj2];

    let totalObj1 = {
      restaurantId: "5061706127732050697a7a61",
      eventId: "5ee23fa0976ee6001793e49f",
      totalPos: 1,
      totalNeg: 1
    }

    let output = [totalObj1]

    expect(getVotesByRestaurant(input)).toEqual(output);
  })
  test('takes an array of 2 vote objects (-,-) for same restaurant, returns correctly', () => {
    let voteObj1 =
    {
      _id: "5ee38256594aa40017024b14",
      restaurantId: "5061706127732050697a7a61",
      eventId: "5ee23fa0976ee6001793e49f",
      positiveVote: 0,
      negativeVote: 1
    }
    let voteObj2 = {
      _id: "5ee38313594aa40017024b15",
      restaurantId: "5061706127732050697a7a61",
      eventId: "5ee23fa0976ee6001793e49f",
      positiveVote: 0,
      negativeVote: 1
    }
    let input = [voteObj1, voteObj2];

    let totalObj1 = {
      restaurantId: "5061706127732050697a7a61",
      eventId: "5ee23fa0976ee6001793e49f",
      totalPos: 0,
      totalNeg: 2
    }

    let output = [totalObj1]

    expect(getVotesByRestaurant(input)).toEqual(output);
  })
  test('takes an array of 3 vote objects, returns correctly', () => {
    let voteObj1 =
    {
      _id: "5ee38256594aa40017024b14",
      restaurantId: "5061706127732050697a7a61",
      eventId: "5ee23fa0976ee6001793e49f",
      positiveVote: 0,
      negativeVote: 1
    }
    let voteObj2 = {
      _id: "5ee38313594aa40017024b15",
      restaurantId: "5061706127732050697a7a61",
      eventId: "5ee23fa0976ee6001793e49f",
      positiveVote: 0,
      negativeVote: 1
    }
    let voteObj3 = {
      _id: "5ee38313594aa40017024b15",
      restaurantId: "5061706127732050697a7a62",
      eventId: "5ee23fa0976ee6001793e49f",
      positiveVote: 1,
      negativeVote: 0
    }
    let input = [voteObj1, voteObj2, voteObj3];

    let totalObj1 = {
      restaurantId: "5061706127732050697a7a61",
      eventId: "5ee23fa0976ee6001793e49f",
      totalPos: 0,
      totalNeg: 2
    }
    let totalObj2 = {
      restaurantId: "5061706127732050697a7a62",
      eventId: "5ee23fa0976ee6001793e49f",
      totalPos: 1,
      totalNeg: 0
    }

    let output = [totalObj1, totalObj2]

    expect(getVotesByRestaurant(input)).toEqual(output);
  })
})