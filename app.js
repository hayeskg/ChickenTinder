const express = require('express');
const graphQlHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();

// const graphQlSchema = require('./graphql/schema/index');
// const graphQlResolvers = require('./graphql/resolvers/index');

const schema = require('./graphql/schema/schema')


const app = express();

app.use(cors());

app.use('/graphql', graphQlHttp({
  schema,
  graphiql: true
}))

app.use('/', (req, res, send) => {
  res.send('Chicken Tinder')
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is live on Port ${process.env.PORT}`)
})

mongoose.connect(process.env.MONGODB_URI, { useFindAndModify: false })
  .catch(err => {
    console.log(err);
  })

