const mongoose = require('mongoose');
const User=require('./User');
const Manager=require('./Manager')
const Admin=require('./Admin')
const transactionSchema = new mongoose.Schema({

 user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
      },
 manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manager',
        required: false
      },
 admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: false
      },
 transaction_id:{
  type:String,
  required:true,
 },

 amount:{
    type:Number,
    required:true,
 },

 from:{
    type:String,
  required:true,
 },

 to:{
    type:String,
  required:true,
 },


 booking_id:{
   type:String,
   required:true,
 },

incoming:{
    type:Boolean,
    required:true,

refund:{
    type:Boolean,
    required:false,
    }


 }

});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports =Transaction;
