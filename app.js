const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const graphQlHttp = require('express-graphql');//middleware
// const bodyParser = require('body-parser');
// const { ApolloServer, gql } = require('apollo-server-express');


const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');


const app = express();

app.use('/graphql', graphQlHttp({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true
}))

app.use('/', (req, res, send) => {
  res.send('Chicken Tinder')
})


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-1akcv.gcp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`App is live on Port ${process.env.PORT}`)
    });
  })
  .catch(err => {
    console.log(err);
  })
