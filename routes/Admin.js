const express=require('express');
const router=express.Router();
const {verifyToken}=require('../middleware/auth.js');
const jwt=require('jsonwebtoken')
const path = require('path');
const upload = require("./multer.js");
const { decode } = require('punycode');
const Admin=require('../models/Admin')
const Managers=require('../models/Admin')
const User =require('../models/User.js')
const Transaction =require('../models/Transaction.js')
const {getadmins}=require('../middleware/Admin');
const adminFunc =require('../controllers/Admin');

router.get("/profile",verifyToken, getadmins, async(req, res) => {

    const usersToday = await adminFunc.getTodaysUsers();
    const managersToday = await adminFunc.getTodaysManagers();
    const todaysProfit = await adminFunc.getTodaysProfit();
    const totalUsers = await User.countDocuments();
      res.render('admin_dashboard', {admin: req.admin, usersToday: usersToday, managersToday: managersToday, todaysProfit: todaysProfit, totalUsers: totalUsers});
});

router.get("/totalUsers",verifyToken, getadmins, async(req, res) => {
  res.render('admin_users', {admin: req.admin});
});
router.get("/totalManagers",verifyToken, getadmins, async(req, res) => {
  res.render('admin_manager', {admin: req.admin});
});
router.get("/totalTransactions",verifyToken, getadmins, async(req, res) => {
  res.render('admin_users', {admin: req.admin});
});

router.post("/fileupload",verifyToken,upload.single("image"), async function(req,res){
  const token = req.cookies.authorization;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const admin = await Admin.findById(decoded.id).select('-password');

  if(!admin){
    return res.status(404).json({error:"Admin not found"});
  }
  admin.profile_pic = req.file.filename;
  await admin.save();
  res.redirect("/admin/dashboard");
});
  

module.exports = router;