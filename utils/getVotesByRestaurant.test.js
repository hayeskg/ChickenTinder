const { getVotesByRestaurant } = require('./getVotesByRestaurant');


describe('transforms an array of vote objects into votes per restaurant objects', () => {
  test('takes an array of objects, returns an array of objects', () => {
    expect(getVotesByRestaurant([])).toEqual([]);
  })
  test('takes an array of 2 vote objects, returns correctly', () => {
    voteObj1 =
    {
      _id: "5ee38256594aa40017024b14",
      restaurantRef: "5061706127732050697a7a61",
      eventRef: "5ee23fa0976ee6001793e49f",
      positiveVote: 1,
      negativeVote: 0
    }
    voteObj2 = {
      _id: "5ee38313594aa40017024b15",
      restaurantRef: "5ee23f9d976ee6001793e481",
      eventRef: "5ee23fa0976ee6001793e49f",
      positiveVote: 1,
      negativeVote: 0
    }
    input = [voteObj1, voteObj2];

    expect(getVotesByRestaurant([])).toEqual([]);
  })
})