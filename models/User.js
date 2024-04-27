const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    name:{
        type: String,
        required: true
    },
    license: {
        type: String,
        required: true
    },
    vehicle: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required:true

    },
    car_description:{
        type: String,
        required: true
    },

    profile_pic:{
      type:String,
    },
    wallet:{
        type:Number,
        default: 0
      },

    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }],
    forgot_token: {
        type: String,
        default: ''
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
