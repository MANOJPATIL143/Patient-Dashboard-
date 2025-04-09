const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileImage: {
    type: String,
    // required: true,
  },
  mobileno: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  weightHistory: [
    {
      date: Date,
      weight: Number,
      bmi: Number
    }
  ],
  medication: {
    type: String,
    dosage: String
  },
  // start is the date when the user started using the app
  // or the date when they started their weight loss journey
  startDate: {
    type: Date,
    default: Date.now,
  },
  weightLosstillnow: {
    type: Number,
    default: 0,
  },
  weightGoal: {
    type: Number,
    default: 0,
  },
  shipments: [
    {
      date: Date,
      status: String,
      tracking: String
    }
  ],
  bmi: {
    type: Number,
    default: 0,
  },
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Generate JWT token
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare passwords
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);