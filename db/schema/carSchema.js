const {Schema, model } = require('mongoose');

const CarSchema = new Schema({
  Model: {type: String,required: true},
  Prize: {type: String,required: true},
  color: {type: String,required:true},
  year: {type:Number,required:true},
  id: {type:Number,required:true}
});

module.exports = model('Car',CarSchema);