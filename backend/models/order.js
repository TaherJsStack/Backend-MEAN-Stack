const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products:    { type: [] },
  active:      { type: Boolean, required: true },
  addedDate:   { type: Date,    required: true },
  totalPrice:  { type: Number,  required: true},
  creatorId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  creatorName: { type: mongoose.Schema.Types.String,   ref: 'User', required: true },
});

module.exports = mongoose.model('Order', orderSchema)
