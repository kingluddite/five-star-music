const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: "variables.env" });

const PORT = process.env.PORT || 4444;

// bring in GraphQL middleware
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

// graphql
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

// create schemas
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

// models
const Artist = require("./models/Artist");
const Song = require("./models/Song");
const User = require("./models/User");

// connect to db (add these lines)
mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch(err => {
    console.log("Error on start: " + err.stack);
    process.exit(1);
  });

// initialize your app
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};

app.use(cors(corsOptions));

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// Connect schemas with GraphQL
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      // pass in mongoose models
      Artist,
      Song,
      User
    }
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
