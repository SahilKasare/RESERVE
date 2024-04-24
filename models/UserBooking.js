const mongoose = require('mongoose');

const userBookingSchema = new mongoose.Schema({
  booking_id: {
    type: String,
    required: true,
    unique: true
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  service: {
    type: String,
    required: true,
    enum: ['parking', 'ev charging', 'cleaning', 'inspection', 'painting']
  },
  cost: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  from_time: {
    type: Number,
    required: true
  },
  to_time: {
    type: Number,
    required: true
  },
  parking_slot_number: {
    type: Number,
    required: function() {
      return this.service === 'parking';
    }
  }
});

const UserBooking = mongoose.model('UserBooking', userBookingSchema);

module.exports = UserBooking;
