const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const graphQlHttp = require('express-graphql');//middleware


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

mongoose.connect(process.env.MONGODB_URI, { useFindAndModify: false })
  .catch(err => {
    console.log(err);
  })


// for React app deployment on Heroku integration
//
// const path = require('path');

// if (process.env.NODE_ENV === 'production'){
//   app.use(express.static('client/build'));

//   app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//   })
// }
// add this script to package.json
// "heroku-postbuild": "cd client && npm install && npm run build"
// "engines":{
//   "node": "14.4.0"
// }
// Procfile web: npm start
