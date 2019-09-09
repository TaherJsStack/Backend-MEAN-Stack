const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name:        { type: String, required: true },
  price:       { type: Number, required: true },
  discount:    { type: Number, required: true },
  priceDisc:   { type: Number, required: true },
  image:       { type: String, required: true },
  description: { type: String, required: true },
  category:    { type: String, required: true },
  showProduct: { type: String, required: true },
  clientItems: { type: Number, required: true },
  addedDate:   { type: Date,   required: true },
  quantity:    { type: String, required: true },
  status:      { type: String, required: true },
  creatorId:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  creatorName: { type: mongoose.Schema.Types.String,   ref: 'User', required: true },
});

module.exports = mongoose.model('Product', productSchema)

