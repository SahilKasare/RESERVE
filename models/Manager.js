const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
    companyName:{
        type: String,
        required: true
    },
    
    location:{
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
    
    services: [{
        type: String,
        enum: ['parking', 'ev charging', 'painting & denting', 'car wash', 'car inspection']
      }],
});

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;
