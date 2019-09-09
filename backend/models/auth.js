const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const authSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  ginder:     { type: String, required: true },
  addedDate:  { type: Date,   required: true },
});

authSchema.plugin(uniqueValidator);


module.exports = mongoose.model('Auth', authSchema);

