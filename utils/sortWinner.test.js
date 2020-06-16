const { sortWinner } = require('./sortWinner.js');

describe('sort winner obj', () => {
  test('given a nested object retuns an obj a winning restaurant ID, an eventID and the winning restaurant should score 19.6', () => {
    const event = [
      {
        score: 5.4,
        eventId: '5ee74f48b92ea52bb6a1c7a5',
        restaurantId: '5ee74f4ab92ea52bb6a1c7a8',
      },
      {
        score: 10.6,
        eventId: '5ee74f48b92ea52bb6a1c7a5',
        restaurantId: '5ee74f4ab92ea52bb6a1c7a6',
      },
      {
        score: 9.4,
        eventId: '5ee74f48b92ea52bb6a1c7a5',
        restaurantId: '5ee74f4ab92ea52bb6a1c7a8',
      },
      {
        score: 19.6,
        eventId: '5ee74f48b92ea52bb6a1c7a5',
        restaurantId: '5ee74f4ab92ea52bb6a1c7a6',
      },
    ];
    expect(sortWinner(event)).toEqual({
      eventId: '5ee74f48b92ea52bb6a1c7a5',
      restaurantId: '5ee74f4ab92ea52bb6a1c7a6',
      score: 19.6,
    });
  });
  test('given a nested object retuns an obj a winning restaurant ID, an eventID and the winning restaurant should score 22.6', () => {
    const event = [
      {
        score: 21.4,
        eventId: '5ee74f48b92ea52bb6a1c7a5',
        restaurantId: '5ee74f4ab92ea52bb6a1c7a8',
      },
      {
        score: 22.6,
        eventId: '5ee74f48b92ea52bb6a1c7a5',
        restaurantId: '5ee74f4ab92ea52bb6a1c7a6',
      },
      {
        score: 9.4,
        eventId: '5ee74f48b92ea52bb6a1c7a5',
        restaurantId: '5ee74f4ab92ea52bb6a1c7a8',
      },
      {
        score: 1.6,
        eventId: '5ee74f48b92ea52bb6a1c7a5',
        restaurantId: '5ee74f4ab92ea52bb6a1c7a6',
      },
    ];
    expect(sortWinner(event)).toEqual({
      eventId: '5ee74f48b92ea52bb6a1c7a5',
      restaurantId: '5ee74f4ab92ea52bb6a1c7a6',
      score: 22.6,
    });
  });
  test('given a nested object retuns an obj a winning restaurant ID, an eventID and the winning restaurant should score 22.6', () => {
    const event = [
      {
        score: 1.4,
        eventId: '5ee74f48b92ea52bb6a1c7a5',
        restaurantId: '5ee74f4ab92ea52bb6a1c7a8',
      },
      {
        score: 1.3,
        eventId: '5ee74f48b92ea52bb6a1c7a5',
        restaurantId: '5ee74f4ab92ea52bb6a1c7a6',
      },
      {
        score: 1.2,
        eventId: '5ee74f48b92ea52bb6a1c7a5',
        restaurantId: '5ee74f4ab92ea52bb6a1c7a8',
      },
      {
        score: 1.1,
        eventId: '5ee74f48b92ea52bb6a1c7a5',
        restaurantId: '5ee74f4ab92ea52bb6a1c7a6',
      },
      {
        score: 1,
        eventId: '5ee74f48b92ea52bb6a1c7a5',
        restaurantId: '5ee74f4ab92ea52bb6a1c7a6',
      },
    ];
    expect(sortWinner(event)).toEqual({
      eventId: '5ee74f48b92ea52bb6a1c7a5',
      restaurantId: '5ee74f4ab92ea52bb6a1c7a8',
      score: 1.4,
    });
  });
});
