const axios = require('axios');

const getTripAdvisorRestaurants = (args) => {
  //TripAdvisor API request options.
  const queryOptions = {
    headers: {
      "X-RapidAPI-Host": process.env.TA_HOST,
      "X-RapidAPI-Key": process.env.TA_KEY
    },
    params: {
      "limit": "30",
      "currency": "GBP",
      "distance": args.distance,
      "lunit": "mi",
      "lang": "en_GB",
      "latitude": args.lat,
      "longitude": args.long
    }

    //"53.3211436"
    //"-1.925856"
  };


  return axios
    .get(
      "https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng",
      queryOptions,
    )
    .then((res) => {

      return res.data.data;

    })
};


module.exports = {
  getTripAdvisorRestaurants
}