const sortWinner = (scoreObjArr) => {
  let sorted = scoreObjArr.sort((b, a) => {
    if (a.score > b.score) {
      return 1;
    } else {
      return -1;
    }
  });
  return sorted[0];
};

module.exports = { sortWinner };
