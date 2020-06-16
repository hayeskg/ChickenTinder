const voteWinner = (
  // should be called scoreCollater
  groupSize,
  totalVotes,
  positiveVotes,
  negativeVotes,
  restaurantId,
  eventId
) => {
  let multiplier = (groupSize - totalVotes) / 10;
  let missingVotes = positiveVotes * multiplier;
  let overallScore = positiveVotes * 5 + missingVotes - negativeVotes;
  let scoreObj = { score: overallScore, eventId, restaurantId };
  return scoreObj;
};

module.exports = { voteWinner }; // should be called scoreCollater
