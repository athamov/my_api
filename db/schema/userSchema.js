const {Schema, model } = require('mongoose');

const UserSchema = new Schema({
  username: {type: String,required: true,unique: true},
  email: {type: String,unique: true,required: true},
  password: {type: String,required:true},
})

module.exports = model('User',UserSchema);