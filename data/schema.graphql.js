const { gql } = require("apollo-server-express");

const typeDefa = gql`
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

  type User {
    id: ID!
    email: String!
    username: String! @cacheControl(maxAge: 30)
    password: String!
  }

  type Car {
    id: ID!
    Prize: String
    Model: String!
    color: String
    year: Int
    Sale: Boolean
    Vin: String
    Brand: String
  }

  type Token {
    jwt: ID! @cacheControl(maxAge: 30)
  }

  type Query {
    getUser(username: String!): User
    getUsers: [User]
    getCar(Model: String!): [Car]
    getCars(skip:Int,limit:Int): [Car]
  }

  type Mutation {
    signup(email: String!, username: String!, password: String!): String!,
    login(email: String, username: String, password: String!): Token!,

    update(Id:ID,Model: String,Brand: String,year:Int,Prize: String,Vint:String,color:String,Sale:Boolean):Car
    delete(Model: String!): String!
    CreateCar(Id:ID,Model: String,Brand: String,year:Int,Prize: String,Vint:String,color:String,Sale:Boolean):Car
  }`

module.exports = typeDefa