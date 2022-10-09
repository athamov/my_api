// import { User, Car } from "../db/dbConnector.js";
const {User,Car} = require("../db/dbConnector");
const Auth = require('../services/auth.service');
const { setContext } = require('@apollo/client/link/context');

module.exports = {
  Query: {
    getUsers: async () => await User.find(),
 
    getUser: async (_, { username }, context) => {
      if (!context.userId) throw new Error('You must be authenticated!');
      return User.findOne({username:username})
    },
    getCar: async (_,{Model},context) => {
      if (!context.userId) throw new Error('You must be authenticated!')
      return await Car.find({Model:Model})},
    getCars: async (_,{skip,limit},context) => {
      if (!context.userId) throw new Error('You must be authenticated!')
      return await Car.find().skip(skip).limit(limit)
    }
  },

  Mutation: {
    signup: async (_, { email, username, password }) => {
      const hashedPwd = await Auth.hashPassword(password)
      const user = new User({ email, username, password: hashedPwd })
      await user.save();
      return 'new user successfully created'
    },

    login: async (_, { email, username, password },context) => {
      if (!username && !email) throw new Error('email or username required')
      const userPayload = email ? { email } : {username}
      const user = await User.findOne(userPayload)
      if (!user) throw new Error('Unknown user', userPayload)
      // context.userId = user.id
      const correctPassword = await Auth.matchPasswords(password, user.password)
      if (!correctPassword) throw new Error('invalid password');
      const jwt = Auth.generateJwt({
        userId: user.id,
        username: user.username,
        email: user.email
      })
      setContext((request, previousContext) => ({
        ...previousContext,
        headers: {
          ...previousContext.headers,
          Authorization:`Bearer ${jwt}`},
      }))

      return {
        jwt: jwt
      }
    },
    CreateCar: async (_,{Id,Model,Brand,year,Prize,Vint,color,Sale},context) => {
      if (!context.userId) throw new Error('You must be authenticated!');
      const car = {
        id:Id,
        Model:Model,
        Brand:Brand,
        year:year,
        Prize:Prize,
        Vint:Vint,
        color:color,
        Sale:Sale
      }
      console.log(car)
      return await Car.create(car);
    },
    update: async (_,{Id,Model,Brand,year,Prize,Vint,color,Sale},context) => {
      if (!context.userId) throw new Error('You must be authenticated!');
      const car = {
        Id:Id,
        Model:Model,
        Brand:Brand,
        year:year,
        Prize:Prize,
        Vint:Vint,
        color:color,
        Sale:Sale
      }
      console.log(car);
      return await Car.findOneAndUpdate({Id:Id},car);
    },
    delete: async (_, {Id},context) => {
      if (!context.userId) throw new Error('You must be authenticated!');
      console.log(await Car.deleteOne({Id:Id}));
      return "deleted succesfully";
    }
  }
}