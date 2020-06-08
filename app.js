const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.use(express.json())

app.use('/', (req, res, send) => {
  res.send('Chicken Tinder')
})


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-1akcv.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  })

