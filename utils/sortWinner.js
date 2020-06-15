const sortWinner = (scoreObjArr) => {

  var theWinnerIs = [];
  for (var score in scoreObjArr) {
    theWinnerIs.push([score, scoreObjArr[score]]);
  }

  theWinnerIs.sort(function (a, b) {
    return a[1] - b[1];

  });
  return theWinnerIs[0];
}
module.exports = { sortWinner };


