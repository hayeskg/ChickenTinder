# CHICKEN TINDER

---

Can never decide where to eat? Try Tinder for restaurants!

## Requirements

---

For development, you will only need NodeJS. All dependencies are already included in the package. Follow the instructions below to set up a local development environment.

### Node

[Node](http://nodejs.org/) is the JavaScript runtime used for this project and is easy to install. It also includes [NPM](https://npmjs.org/) 

- Please use version 14.4.0 or later.

## Install and setup

---

To get access to the [GitHub](https://github.com/hayeskg/ChickenTinderBackend.git) repository, simply follow the steps below and clone it to the local machine, open the folder and run the NPM Install command.

    $ git clone https://github.com/hayeskg/ChickenTinderBackend.git
    $ cd ChickenTinderBackend
    $ npm install

This will install all required dependencies.

### MongoDB credentials and configuration

The backend uses the [MongoDB Atlas](https://www.mongodb.com/) cloud service for storage.

A `.env` file will need to be added to the project root folder and gitignored.

After signing up to MongoDB Atlas, use the credentials (USERNAME, PASSWORD, DB_COLLECTION_NAME)in the .env file as shown below:

```
MONGODB_URI = mongodb+srv://USERNAME:PASSWORD@cluster0-1akcv.gcp.mongodb.net/DB_COLLECTION_NAME?retryWrites=true&w=majority
```

### TripAdvisor API Key and configuration

Restaurants are pulled from the [RapidAPI](https://rapidapi.com/apidojo/api/tripadvisor1) version of the popular TripAdvisor API. 

In order to get free access to this service, an account needs to be set up, which generates a key. This needs to be inserted into the `.env` file already configured:

```
TA_HOST = tripadvisor1.p.rapidapi.com
TA_KEY = 1234567890abcdefghijklmnopqrstovwxyz
```

This will populate the Axios HTTP request header and be validated by RapidAPI, returning restaurants matching the search criteria.

## Start

To start the application locally, use the command:

    $ npm start

This will run the GraphQL server on the endpoint: `localhost:3000/graphql`

## Languages & tools

---

### Express

- [Express](http://expressjs.com/) is used as the web server framework for NodeJS in this project. 

### GraphQL and ExpressGraphQL

- [GraphQL](https://graphql.org/) is a query language and runtime for building APIs and accessing data from them. It's an alternative to RESTful API architectures and allows for more precise data structure definition for requests and mutations. 

- [express-graphql](https://www.npmjs.com/package/express-graphql) middleware for Express servers.

### MongoDB and Mongoose

- [MongoDB](https://www.mongodb.com/) is used for storage - it's a non-relational database technology. The Atlas version is a cloud based service which makes administration and user/access management and scaling simple. 

- [Mongoose](https://mongoosejs.com/) a Node library for MongoDB data modelling and CRUD operations. It's promise based and works well in asynchronous environments.

### axios

- [axios](https://www.npmjs.com/package/axios) promise based HTTP client for Node. Good support from RapidAPI.

### Authentication

- [Firebase](https://firebase.google.com/) is used for user login authentication. A secure Google service.

## Authors

---

- [Jordan Tai](https://github.com/jordantai) 
- [Kristof Hayes](https://github.com/hayeskg) 
- [Laura Kenny](https://github.com/Lajanke) 
- [Lee Bates](https://github.com/batespcm) 
- [Telisa du Plessis](https://github.com/BitterBlue22)

## Acknowledgements

---

- [Northcoders](https://northcoders.com/)
