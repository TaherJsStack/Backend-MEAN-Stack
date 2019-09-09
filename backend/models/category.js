const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name:        { type: String, required: true },
  showCategory:{ type: Boolean, required: true },
  description: { type: String, required: true },
  addedDate:   { type: Date,   required: true },
  creatorId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  creatorName: { type: mongoose.Schema.Types.String,   ref: 'User', required: true },
});

module.exports = mongoose.model('Category', categorySchema);
