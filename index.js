const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const Auth = require('./services/auth.service');
const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./data/resolvers.graphql');
const typeDefs = require('./data/schema.graphql');
const { InMemoryLRUCache } = require('@apollo/utils.keyvaluecache');
// retrieve env vars

/**
 * Create an Apollo server instance.
 */
 const server = new ApolloServer({ 
  apollo: {key:process.env.APOLLO_KEY},
  typeDefs, 
  resolvers,
  cache: new InMemoryLRUCache(),
  context: req => {
    // console.log(Auth.getUserId({req}));
  return {
    ...req,
    userId:req? Auth.getUserId({req}): null
  };
} });

 /**
  * Create an express server and apply the Apollo Server middleware
  */
 const app = express();
 async function start() {
  await server.start();
  server.applyMiddleware({ app });

  // await mongoose.connect(
  //   'mongodb+srv://Goodboyz7:nurullox00@mycluster1.mqtqv.mongodb.net/myFirstDatabase',
  //   { useNewUrlParser: true, useUnifiedTopology: true }
  // )
  app.get("/", (req, res) => {
    console.log("Apollo GraphQL Express server is ready");
    res.status(200).send("Apollo GraphQL Express server is ready");
  });


  app.listen({ port: process.env.PORT }, () => {
    console.log(
      `Server is running at http://localhost:${process.env.PORT}${server.graphqlPath}`
    );
  });
 }
 

 
start()