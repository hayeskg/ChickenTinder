const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const graphQlHttp = require('express-graphql');//middleware
// const bodyParser = require('body-parser');
// const { ApolloServer, gql } = require('apollo-server-express');


const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');



app.use(cors());
app.use('/graphql', graphQlHttp({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true
}))

app.use('/', (req, res, send) => {
  res.send('Chicken Tinder')
})


app.listen(process.env.PORT || 3000, () => {
  console.log(`App is live on Port ${process.env.PORT}`)
})

mongoose.connect(process.env.MONGODB_URI)
  .catch(err => {
    console.log(err);
  })
