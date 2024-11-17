const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Subscription' },
  buyer: { type: String, required: true }, // You can adjust this to match your authentication system
  purchaseDate: { type: Date, default: Date.now },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
});

module.exports = mongoose.model('Purchase', PurchaseSchema);
