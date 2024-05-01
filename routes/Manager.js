const express=require('express');
const router=express.Router();
const {verifyToken}=require('../middleware/auth.js');
const {getmanagers}=require('../middleware/Manager.js');
const User =require('../models/User.js')
const Booking =require('../models/Booking.js')
const jwt=require('jsonwebtoken')
const path = require('path');
const upload = require("./multer.js");
const { decode } = require('punycode');
const {managerLogout}=require('../controllers/auth.js')
const Manager=require('../models/Manager');
const {updateinfo}=require('../controllers/Manager')
const {addmoney}=require('../controllers/Manager.js')

router.get("/dashboard",verifyToken, getmanagers, async(req, res) => {
    
      res.render('manager_dashboard', {manager: req.manager});
});
  
router.get("/bookings",verifyToken,async(req, res) => {
  const token = req.cookies.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const manager = await Manager.findById(decoded.id).select('-password');
    if (!manager) {
      return res.status(404).json({ error: "Manager not found" });
    }

    Booking.find({ manager: manager._id })
        .populate('user') // Populate the user field to get user details
        .then(bookings => {
            res.render('manager_bookings', {manager: manager, bookings: bookings});
        })
});

router.get("/schedule",verifyToken,async(req, res) => {
  const token = req.cookies.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const manager = await Manager.findById(decoded.id).select('-password');
    if (!manager) {
      return res.status(404).json({ error: "Manager not found" });
    }
    res.render('manager_schedule', {manager});
});

router.get("/logout",managerLogout)
 

router.get("/services",verifyToken,async(req, res) => {
  const token = req.cookies.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const manager = await Manager.findById(decoded.id).select('-password');
    if (!manager) {
      return res.status(404).json({ error: "Manager not found" });
    }
    res.render('manager_services', {manager});
});

router.get("/update",verifyToken,async(req, res) => {
  const token = req.cookies.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const manager = await Manager.findById(decoded.id).select('-password');
    if (!manager) {
      return res.status(404).json({ error: "Manager not found" });
    }
    console.log(manager.services.cleaning);
    res.render('manager_update', {manager});
});

router.get("/wallet",verifyToken,async(req, res) => {
  const token = req.cookies.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const manager = await Manager.findById(decoded.id).select('-password');
    if (!manager) {
      return res.status(404).json({ error: "Manager not found" });
    }
    res.render('manager_wallet', {manager});
});

router.post("/fileupload",verifyToken,upload.single("image"), async function(req,res){
  const token = req.cookies.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const manager = await Manager.findById(decoded.id).select('-password');

  if(!manager){
    return res.status(404).json({error:"Manager not found"});
  }
  manager.profile_pic = req.file.filename;
  await manager.save();
  res.redirect("/managers/dashboard");
});


router.post("/update",getmanagers,updateinfo);
router.post("/wallet",getmanagers,addmoney)
module.exports = router;

