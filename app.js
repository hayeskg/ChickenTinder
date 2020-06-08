const express = require('express');


const app = express();

app.use(express.json())

app.use('/', (req, res, send) => {
  res.send('Chicken Tinder')
})

app.listen(3000)