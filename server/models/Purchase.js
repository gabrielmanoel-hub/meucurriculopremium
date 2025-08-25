const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  modelo: {
    type: String,
    required: true
  },
  valor: {
    type: Number,
    required: true
  },
  dataCompra: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'pending'
  },
  mercadoPagoPreferenceId: {
    type: String
  }
});

module.exports = mongoose.model('Purchase', PurchaseSchema);