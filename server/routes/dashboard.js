const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Shipment = require('../models/Shipment');

router.get('/', protect, async (req, res) => {
    const user = await User.findById(req.user.id);
    const shipment = await Shipment.find({ userId: req.user.id });
    const nextShipment = shipment;
    res.json({
        name: user.name,
        // currentWeight: user.currentWeight,
        // goalWeight: user.goalWeight,
        bmi: user.bmi,
        weightHistory: user.weightHistory,
        nextShipment: nextShipment.map((s) => ({
            shipmentDate: s.shipmentDate,
            status: s.status,
            trackingNumber: s.trackingNumber,
        })),
        startDate: user.startDate,
        weightGoal: user.weightGoal,
        medication: user.medication,
    });
});

router.post('/updateDashboard', protect, async (req, res) => {
    try {
        const { currentWeight, weightGoal, bmi, weightloss, date } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add new weight entry to history
        user.weightHistory.push({ weight: currentWeight, date: date || new Date() });

        // Update other fields
        user.weightGoal = weightGoal;
        user.bmi = bmi;
        user.weightLosstillnow = weightloss;

        await user.save();

        res.json(user);
    } catch (error) {
        console.error('Update error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;