const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  name: {
    firstname      : { type: String },
    lastname       : { type: String }
  },
  address: {
    country: { type: String },
    street:  { type: String },
    zip:     { type: String },
    city:    { type: String },
  },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  phone:     { type: Number, required: true },
  ginder:    { type: String, required: true },
  photoURL:  { type: String, required: true },
  blockUser: { type: Boolean, required: true },
  roll:      { type: String, required: true },
  date:      { type: Date,   required: true },
  created_at: { type: Date,   required: true },
  orders: []
});

// get  error if user email is exist
// it work by 'mongoose unique validator
// to use it but unique: true like email
userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema);

