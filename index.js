// import express from "express";
const express = require("express");
const mongoose = require("mongoose");
// import mongoose from 'mongoose';
// import Auth from './services/auth.service';
const Auth = require('./services/auth.service');
const { ApolloServer } = require('apollo-server-express')
// import { ApolloServer } from "apollo-server-express";
const resolvers = require('./data/resolvers.graphql')
// import { resolvers } from "./data/resolvers.graphql";
const typeDefs = require('./data/schema.graphql');
// import { typeDefs } from "./data/schema.graphql";
const {PORT} = require('./config/config')
// import { PORT } from "./config/config";

/**
 * Create an Apollo server instance.
 */
 const server = new ApolloServer({ 
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

  app.listen({ port: PORT }, () => {
    console.log(
      `Server is running at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
 }
 
 app.get("/", (req, res) => {
   console.log("Apollo GraphQL Express server is ready");
 });
 
start()