const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

router.get('/', protect, async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json({ weightHistory: user.weightHistory, bmi: user.bmi });
});

router.post('/', protect, async (req, res) => {
    const { weight, date } = req.body;
    const user = await User.findById(req.user.id);
    user.weightHistory.push({ weight, date: date || new Date() });
    user.currentWeight = weight;

    // Simple BMI calculation (example: weight / height^2) if height is known
    // user.bmi = updatedBMI;

    await user.save();
    res.json(user.weightHistory);
});

module.exports = router;
