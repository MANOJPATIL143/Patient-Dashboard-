const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { protect } = require('../middleware/authMiddleware');
const Shipment = require('../models/Shipment');

router.get('/', protect, async (req, res) => {
  const shipments = await Shipment.find({ userId: req.user.id }).sort({ shipmentDate: -1 });
  res.json(shipments);
});

router.get('/upcoming', protect, async (req, res) => {
  const shipments = await Shipment.find({ userId: req.user.id, shipmentDate: { $gte: new Date() } }).sort({ shipmentDate: 1 });
  res.json(shipments[0] || null);
});

router.post('/upcoming', protect, async (req, res) => {
  const { shipmentDate, status, trackingNumber } = req.body;
  const shipment = new Shipment({ userId: req.user.id, shipmentDate, status, trackingNumber });
  await shipment.save();
  res.json(shipment);
});

router.post('/', protect, async (req, res) => {
  const { shipmentDate, status, trackingNumber } = req.body;
  const shipment = new Shipment({ userId: req.user.id, shipmentDate, status, trackingNumber });
  await shipment.save();
  res.json(shipment);
});

module.exports = router;
