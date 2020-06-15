const { sortWinner } = require('./sortWinner.js');

describe("sort winner obj", () => {
  test("given a nested object retuns an obj", () => {
    const event = [{
      score: 5.4,
      eventId: '5ee74f48b92ea52bb6a1c7a5',
      restaurantId: '5ee74f4ab92ea52bb6a1c7a8'
    }, {
      score: 10.6,
      eventId: '5ee74f48b92ea52bb6a1c7a5',
      restaurantId: '5ee74f4ab92ea52bb6a1c7a6'
    }]
    expect(sortWinner()).toEqual()
  })
})