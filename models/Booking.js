const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  booking_id: {
    type: String,
    unique: true
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager',

  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  service: {
    type: String,
 
    enum: ['parking', 'ev charging', 'cleaning', 'inspection', 'painting']
  },
  cost: {
    type: Number,

  },
  date: {
    type: Date,
  },
  from_time: {
    type: Number,
  },
  to_time: {
    type: Number,
    default : 0,
  },
  parking_slot_number: {
    type: Number,
    required: function() {
      return this.service === 'parking';
    }
  },
  registration_date : {
    type:Date,
    default : Date.now,
  },
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
