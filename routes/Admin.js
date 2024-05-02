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
const {adminLogout}=require('../controllers/auth')
router.get("/profile",verifyToken, getadmins, async(req, res) => {

    const usersToday = await adminFunc.getTodaysUsers();
    const managersToday = await adminFunc.getTodaysManagers();
    const deci = await adminFunc.getTodaysProfit();
    const todaysProfit = deci.toFixed(2);
    const totalUsers = await User.countDocuments();
      res.render('admin_dashboard', {admin: req.admin, usersToday: usersToday, managersToday: managersToday, todaysProfit: todaysProfit, totalUsers: totalUsers});
});

router.get("/totalUsers",verifyToken, getadmins, async(req, res) => {

  const totalUsers = await User.countDocuments();
  const users = await User.find({}, 'name email contact username address car_description license');
  res.render('admin_users', {admin: req.admin, totalUsers: totalUsers, users: users});
});


router.post('/deleteUser', verifyToken, getadmins, adminFunc.Userdeleted);

// router.delete("/admin/:username", verifyToken, async (req, res) => {
//   const userId = req.params.userId;
//   try {
//     await User.findByIdAndDelete(userId);
//     res.status(200).send("User deleted successfully");
//   } catch (error) {
//     res.status(500).send("Error deleting user");
//   }
// });


// router.post('/totalUsers/userByID',verifyToken, getadmins, async(req, res) => {
//   const search = req.body.search;
//   const user = await User.findOne({ username: search });
//   req.session.userbyUsername = user;
// })

// router.get("/totalUsers/userByID",verifyToken, getadmins, async(req, res) => {
  
//   res.render('admin_users_search', {admin: req.admin});
// })
router.get("/totalManagers",verifyToken, getadmins, async(req, res) => {
  const totalManagers = await Managers.countDocuments();
  const managers = await Managers.find({}, 'name email contact username location companyName');
  res.render('admin_manager', {admin: req.admin, totalManagers: totalManagers, managers: managers});
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
  
router.get('/logout',adminLogout)

module.exports = router;