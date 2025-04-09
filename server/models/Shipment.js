const mongoose = require('mongoose');
const { create } = require('./User');

const ShipmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  shipmentDate: Date,
  status: String,
  trackingNumber: String,
  medication: {
    name: String,
    dosage: String,
    frequency: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }
}, { timestamps: true });

module.exports = mongoose.model('Shipment', ShipmentSchema);