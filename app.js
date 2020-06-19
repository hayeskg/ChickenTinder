const express = require("express");
const graphQlHttp = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const admin = require("firebase-admin");


const schema = require("./graphql/schema/schema");

const app = express();

app.use(cors());

const port = process.env.PORT || 3000;

app.use(
  "/graphql",
  graphQlHttp({
    schema,
    graphiql: true,
  })
);

app.use("/", (req, res, send) => {
  res.send("Welcome to the Chicken Tinder server - head to the /graphql endpoint to explore our API.");
});

app.listen(port, () => {
  console.log(`Chicken Tinder available on port: ${port}`);
});

mongoose
  .connect(process.env.MONGODB_URI,
    {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
  )
  .catch((err) => {
    console.log(err);
  });
