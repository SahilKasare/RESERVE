const User = require('../models/User.js');
const jwt=require('jsonwebtoken')


exports.getusers=async(req,res, next)=>{
    const token = req.cookies.authorization;
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
  
    const user = await User.findById(decoded.id).select("-password");
  
    if(!user){
      return res.status(404).json({error : "User not found"});
    }
req.user=user;
next();
}