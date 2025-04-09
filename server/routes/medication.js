const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const Shipment = require('../models/Shipment');

router.get('/', protect, async (req, res) => {
    const latestShipment = await Shipment.findOne({ userId: req.user.id }).sort({ shipmentDate: -1 });
    if (!latestShipment) return res.status(404).json("No medication found");
    res.json(latestShipment.medication);
});

router.post('/', protect, async (req, res) => {
    const { medicationname, dosage, frequency } = req.body;
    const latestShipment = await Shipment.findOne({ userId: req.user.id }).sort({ shipmentDate: -1 });
    latestShipment.medication = {
        name: medicationname,
        dosage: dosage,
        frequency: frequency
    };
    await latestShipment.save();
    res.json(latestShipment.medication);
});
// medication: {
//     name: String,
//     dosage: String,
//     frequency: String
//   }
module.exports = router;
