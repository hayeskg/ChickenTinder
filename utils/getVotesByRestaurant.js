const getVotesByRestaurant = (votesArr) => {
  let outArr = [];
  votesArr.map(vote => {
    let tempRestRef = '';
    let tempEventRef = '';
    let tempPos = 0;
    let tempNeg = 0;
    let flag = false;
    for (let i = 0; i < outArr.length; i++) {
      if (outArr[i].restaurantId === vote.restaurantId) {
        if (vote.positiveVote > 0) {
          outArr[i].totalPos++;
        } else if (vote.negativeVote > 0) {
          outArr[i].totalNeg++;
        }
        flag = true;
      }

    }
    if (flag === false) {
      tempRestRef = vote.restaurantId;
      tempEventRef = vote.eventId;
      if (vote.positiveVote > 0) {
        tempPos++;
      } else if (vote.negativeVote > 0) {
        tempNeg++;
      }
      let totObj = {
        restaurantId: tempRestRef,
        eventId: tempEventRef,
        totalPos: tempPos,
        totalNeg: tempNeg,
      }
      outArr.push(totObj)
    }
    flag = false;
  })
  return outArr;
}

module.exports = { getVotesByRestaurant };
