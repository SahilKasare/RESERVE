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
    crequired:true,
  },

 booking_id:{
   type:String,
   required:true,
 },

  incoming_user:{
    type:Boolean,
    required:true,
  },
  incoming_manager:{
    type:Boolean,
    required:true,
  },
  incoming_admin:{
    type:Boolean,
    required:true,
  },
  manager_refund:{
    type:Boolean,
    required:false,
  },
  user_refund:{
    type:Boolean,
    required:false,
  },
  registration_date : {
    type:Date,
    default : Date.now,
  }

});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports =Transaction;
