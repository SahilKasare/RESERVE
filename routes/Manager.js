const express=require('express');
const router=express.Router();
const {verifyToken}=require('../middleware/auth.js');
const User =require('../models/User.js')
const jwt=require('jsonwebtoken')
const path = require('path');
const upload = require("./multer.js");
const { decode } = require('punycode');
const Manager=require('../models/Manager');

router.get("/dashboard",verifyToken,async(req, res) => {
    const token = req.cookies.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const manager = await Manager.findById(decoded.id).select('-password');
      if (!manager) {
        return res.status(404).json({ error: "User not found" });
      }
      res.render('manager_dashboard', {manager});
});
  
router.post("/fileupload",verifyToken,upload.single("image"), async function(req,res){
  const token = req.cookies.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const manager = await Manager.findById(decoded.id).select('-password');

  if(!manager){
    return res.status(404).json({error:"User not found"});
  }
  manager.profile_pic = req.file.filename;
  await manager.save();
  res.redirect("/managers/dashboard");
});

module.exports = router;