const express=require('express');
const router=express.Router();
const {verifyToken}=require('../middleware/auth.js');
const User =require('../models/User.js')
const jwt=require('jsonwebtoken')
const path = require('path');
const upload = require("./multer.js");
const { decode } = require('punycode');

router.get("/profile",verifyToken,async(req, res) => {
  const token = req.cookies.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.render('user_service', {user});
  });



router.post("/fileupload",verifyToken,upload.single("image"), async function(req,res){
  const token = req.cookies.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userobj = await User.findById(decoded.id).select('-password');
  if(!userobj){
    return res.status(404).json({error:"User not found"});
  }
  userobj.profile_pic = req.file.filename;
  await userobj.save();
  res.redirect("/users/profile");
});


router.get("/user_park",verifyToken,async function(req,res){

  const token = req.cookies.authorization;
  const decoded = jwt.verify(token,process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");

  if(!user){
    return res.status(404).json({error : "User not found"});
  }

  res.render("user_parking",{user});
});


router.get("/user_current_bookings",verifyToken,async function(req,res){

  const token = req.cookies.authorization;
  const decoded = jwt.verify(token,process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");

  if(!user){
    return res.status(404).json({error : "User not found"});
  }

  res.render("user_current-bookings",{user});
});

router.get("/user_wallet",verifyToken,async function(req,res){

  const token = req.cookies.authorization;
  const decoded = jwt.verify(token,process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");

  if(!user){
    return res.status(404).json({error : "User not found"});
  }

  res.render("user_wallet",{user});
});

module.exports = router;
