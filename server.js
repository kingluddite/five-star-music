const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require('body-parser');
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config({ path: "variables.env" });

const PORT = process.env.PORT || 4444;

// bring in GraphQL middleware
const { ApolloServer } = require("apollo-server-express");

// graphql
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

// models
const Artist = require("./models/Artist");
const Song = require("./models/Song");
const User = require("./models/User");

// connect to db
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch(err => {
    console.log(`Error on start: ${err.stack}`);
    process.exit(1);
  });

// initialize your app
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));

// set up JWT authentication middleware
app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  if (token !== "null") {
    try {
      req.currentUser = jwt.verify(token, process.env.SECRET);
    } catch (err) {
      console.error(err);
    }
  }
  next();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ Artist, Song, User, currentUser: req.currentUser })
});
server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
