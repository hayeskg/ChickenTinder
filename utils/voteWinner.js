const { getVotesByRestaurant } = require('./getVotesByRestaurant');

const voteWinner = (groupSize, totalVotes, positiveVotes, negativeVotes) => {
  let multiplier = (groupSize - totalVotes) / 10;
  let missingVotes = positiveVotes * multiplier;
  let overallScore = positiveVotes * 5 + missingVotes - negativeVotes;
  return overallScore;
};

module.exports = { voteWinner };