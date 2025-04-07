// src/models/otp_model.js
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phone_number: {
    type: String,
    required: true,
    unique: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const OtpModel = mongoose.model('Otp', otpSchema);

module.exports = { OtpModel }; // ✅ MUST be this
