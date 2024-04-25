const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
   
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profile_pic:{
        type:String,
      },
    
      wallet:{
        type:Number,
        default: 0
      },

    isAdmin:{
        type:Boolean,
        required:true,
    },
    
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction'
    }]

});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
