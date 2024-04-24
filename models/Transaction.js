const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 transaction_id:{
  type:String,
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

module.exports = User;
