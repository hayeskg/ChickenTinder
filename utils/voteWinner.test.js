const { voteWinner } = require('./voteWinner.js');

describe('Vote Weighting always getting the right winner', () => {
  test('Returns a vote Score for a group of 10 where everyone voted 5 positiveVotes 5 negativeVotes Restaurant Score to be 20', () => {
    const groupSize = 10; // voting.id.length
    const positiveVotes = 5; // positiveVotes
    const negativeVotes = 5; // negativeVotes
    const totalVotes = positiveVotes + negativeVotes;
    expect(voteWinner(groupSize, totalVotes, positiveVotes, negativeVotes)).toEqual(20);
  });
  test('Returns a vote Score for a group of 10 with 4 positiveVotes 2 negativeVotes and 4 missing votes Restaurant Score to be 19.6', () => {
    const groupSize = 10;
    const positiveVotes = 4;
    const negativeVotes = 2;
    const totalVotes = positiveVotes + negativeVotes;
    expect(voteWinner(groupSize, totalVotes, positiveVotes, negativeVotes)).toEqual(19.6);
  });
  test('Returns a vote Score for a group of 10 with 3 positiveVotes 3 negativeVotes and 4 missing votes Restaurant Score to be 13.2', () => {
    const groupSize = 10;
    const positiveVotes = 3;
    const negativeVotes = 3;
    const totalVotes = positiveVotes + negativeVotes;
    expect(voteWinner(groupSize, totalVotes, positiveVotes, negativeVotes)).toEqual(13.2);
  });
  test('Returns a vote Score for a group of 10 with 4 positiveVotes 6 negativeVotes Restaurant Score to be 14', () => {
    const groupSize = 10;
    const positiveVotes = 4;
    const negativeVotes = 6;
    const totalVotes = positiveVotes + negativeVotes;
    expect(voteWinner(groupSize, totalVotes, positiveVotes, negativeVotes)).toEqual(14);
  });
  test('Returns a vote Score for a group of 10 with 2 positiveVotes 0 negativeVotes 8 missing Restaurant Score to be 11.6', () => {
    const groupSize = 10;
    const positiveVotes = 2;
    const negativeVotes = 0;
    const totalVotes = positiveVotes + negativeVotes;
    expect(voteWinner(groupSize, totalVotes, positiveVotes, negativeVotes)).toEqual(11.6);
  });
  test('Returns a vote Score for a group of 10 with 3 positiveVotes 6 negativeVotes 1 missing Restaurant Score to be 9.3', () => {
    const groupSize = 10;
    const positiveVotes = 3;
    const negativeVotes = 6;
    const totalVotes = positiveVotes + negativeVotes;
    expect(voteWinner(groupSize, totalVotes, positiveVotes, negativeVotes)).toEqual(9.3);
  });
  test('Returns a vote Score for a group of 7 with 3 positiveVotes 4 negativeVotes', () => {
    const groupSize = 7;
    const positiveVotes = 3;
    const negativeVotes = 4;
    const totalVotes = positiveVotes + negativeVotes;
    expect(voteWinner(groupSize, totalVotes, positiveVotes, negativeVotes)).toEqual(11);
  });
  test('Returns a vote Score for a group of 7 with 3 positiveVotes 1 negativeVotes 3 missing Restaurant Score to be 14.9', () => {
    const groupSize = 7;
    const positiveVotes = 3;
    const negativeVotes = 1;
    const totalVotes = positiveVotes + negativeVotes;
    expect(voteWinner(groupSize, totalVotes, positiveVotes, negativeVotes)).toEqual(14.9);
  });
  test('Returns a vote Score for a group of 5 with 4 positiveVotes 1 negativeVotes Restaurant Score to be 19', () => {
    const groupSize = 5;
    const positiveVotes = 4;
    const negativeVotes = 1;
    const totalVotes = positiveVotes + negativeVotes;
    expect(voteWinner(groupSize, totalVotes, positiveVotes, negativeVotes)).toEqual(19);
  });
  test('Returns a vote Score for a group of 5 with 3 positiveVotes 0 negativeVotes 2 missing, Restaurant Score to be 15.6', () => {
    const groupSize = 5;
    const positiveVotes = 3;
    const negativeVotes = 0;
    const totalVotes = positiveVotes + negativeVotes;
    expect(voteWinner(groupSize, totalVotes, positiveVotes, negativeVotes)).toEqual(15.6);
  });
  test('Returns a vote Score for a group of 5 with 2 positiveVotes 3 negativeVotes', () => {
    const groupSize = 5;
    const positiveVotes = 2;
    const negativeVotes = 3;
    const totalVotes = positiveVotes + negativeVotes;
    expect(voteWinner(groupSize, totalVotes, positiveVotes, negativeVotes)).toEqual(7);
  });
  test('Returns a vote Score for a group of 3 with 1 positiveVotes 2 negativeVotes, Restaurant Score to be 3', () => {
    const groupSize = 3;
    const positiveVotes = 1;
    const negativeVotes = 2;
    const totalVotes = positiveVotes + negativeVotes;
    expect(voteWinner(groupSize, totalVotes, positiveVotes, negativeVotes)).toEqual(3);
  });
  test('Returns a vote Score for a group of 3 with 2 positiveVotes 1 negativeVotes, Restaurant Score to be 9', () => {
    const groupSize = 3;
    const positiveVotes = 2;
    const negativeVotes = 1;
    const totalVotes = positiveVotes + negativeVotes;
    expect(voteWinner(groupSize, totalVotes, positiveVotes, negativeVotes)).toEqual(9);
  });
  test('Returns a vote Score for a group of 3 with 2 positiveVotes 1 negativeVotes, Restaurant Score to be 15', () => {
    const groupSize = 3;
    const positiveVotes = 3;
    const negativeVotes = 0;
    const totalVotes = positiveVotes + negativeVotes;
    expect(voteWinner(groupSize, totalVotes, positiveVotes, negativeVotes)).toEqual(15);
  });
  test('Returns a vote Score for a group of 3 with 1 positiveVotes 1 negativeVotes 1 missing, Restaurant Score to be 4.1', () => {
    const groupSize = 3;
    const positiveVotes = 1;
    const negativeVotes = 1;
    const totalVotes = positiveVotes + negativeVotes;
    expect(voteWinner(groupSize, totalVotes, positiveVotes, negativeVotes)).toEqual(4.1);
  });
  test('Returns a vote Score for a group of 3 with 1 positiveVotes 2 missing, Restaurant Score to be 5.2', () => {
    const groupSize = 3;
    const positiveVotes = 1;
    const negativeVotes = 0;
    const totalVotes = positiveVotes + negativeVotes;
    expect(voteWinner(groupSize, totalVotes, positiveVotes, negativeVotes)).toEqual(5.2);
  });
});