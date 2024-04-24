const mongoose = require('mongoose');

const feedBackSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    feedback: {
        type: String,
        required:true

    }
});

const User = mongoose.model('User', feedBackSchema);

module.exports = User;
