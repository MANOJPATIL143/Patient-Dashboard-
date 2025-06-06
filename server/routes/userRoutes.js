const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// User routes
router.post('/users', userController.createUser);
router.get('/',  userController.getUsers);
router.get('/me', protect, userController.getSelfProfile); 
router.post('/updateuser', protect, userController.UpdateUser);

module.exports = router;