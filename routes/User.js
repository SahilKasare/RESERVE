const express=require('express');
const router=express.Router();
const {verifyToken}=require('../middleware/auth.js');
const User =require('../models/User.js')
const jwt=require('jsonwebtoken')
const path = require('path');

router.get("/profile",verifyToken,async(req, res) => {
  const token = req.cookies.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.render('user_service', {user});
  });
module.exports = router;