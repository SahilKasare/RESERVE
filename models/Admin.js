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
    
    isAdmin:{
   type:Boolean,
   required:true,
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
