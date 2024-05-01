const express=require('express');
const router=express.Router();
const {verifyToken}=require('../middleware/auth.js');
const User =require('../models/User.js')
const Manager =require('../models/Manager.js')
const jwt=require('jsonwebtoken')
const path = require('path');
const upload = require("./multer.js");
const { decode } = require('punycode');
const {getusers}=require('../middleware/User');
const user =require('../controllers/User');
const {addmoney}=require('../controllers/User.js')
const {userLogout}=require('../controllers/auth.js')
router.get("/profile",verifyToken,getusers,async(req, res) => {

   
    res.render('user_service', {user: req.user});
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


router.get("/user_park",verifyToken,getusers, async function(req,res){

  res.render('user_parking', {user: req.user});

});


router.get("/user_current_bookings",verifyToken, getusers, async function(req,res){

  res.render("user_current-bookings",{user: req.user});
});

router.get("/user_wallet",verifyToken, getusers, async function(req,res){


  res.render("user_wallet",{user: req.user});
});

router.post("/user_wallet",getusers,addmoney)

router.get("/carwash",verifyToken, getusers, async function(req,res){
  const locations = await Manager.distinct('location');
  res.render("searcwash",{user: req.user, locations});
});

router.get("/carevcharge",verifyToken, getusers,async function(req,res){
  const locations = await Manager.distinct('location');
  res.render("searchev",{user: req.user, locations});
});

router.get("/carpark",verifyToken, getusers,async function(req,res){
  const locations = await Manager.distinct('location');
  res.render("searchpark",{user: req.user, locations});
});

router.get("/carinsp",verifyToken, getusers,async function(req,res){
  const locations = await Manager.distinct('location');
  res.render("searchinsp",{user: req.user, locations});
});

router.get("/carpaint",verifyToken, getusers,async function(req,res){
  const locations = await Manager.distinct('location');
  res.render("searchpaint",{user: req.user, locations});
});

router.post('/carwash', user.getcarwashService);
router.post('/carevcharge', user.getcarchargeService);
router.post('/carpark', user.getcarparkService);
router.post('/carinsp', user.getcarinspectionService);
router.post('/carpaint', user.getcarpaintingService);
router.get("/got_centers",verifyToken, getusers, async function(req,res){
  const managers = req.session.managers || [];
  const service = req.session.service;
  res.render("user_got_centers",{user:req.user, managers :managers, service: service} );
});

router.get("/logout",userLogout);
router.get("/payment", verifyToken, getusers, async function(req, res) {
  const managerId = req.query.managerId;
  
  try {
      // Assuming Manager.findById is a function to find a manager by their ID
      const selectedManager = await Manager.findById(managerId);
      const servicecentre = req.session.servicecentre;
      const service = req.session.service;
      if (!selectedManager) {
          // Handle case where manager with given ID is not found
          return res.status(404).send("Manager not found");
      }
      
      // Render the payment page with the selected manager's data
      res.render("user_payment", { user: req.user, selectedManager, servicecentre, service });
  } catch (error) {
      // Handle errors
      console.error("Error fetching manager:", error);
      res.status(500).send("Error fetching manager");
  }
});

router.get("/paymentSuccessful",verifyToken, getusers, async function(req,res){
  
  res.render("success",{user:req.user} );
});

router.get("/user_preview",verifyToken,async function(req,res){
  const token = req.cookies.authorization;
  const decoded = jwt.verify(token,process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");

  if(!user){
    return res.status(404).json({error : "User not found"});
  }
  res.render("user_preview",{user});
});


router.post("/user_preview",verifyToken,async function(req,res){
  const token = req.cookies.authorization;
  const decoded = jwt.verify(token,process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");

  if(!user){
    return res.status(404).json({error : "User not found"});
  }
  const {review , stars} = req.body;

  user.allreview.push({review,stars}) 
  await user.save();

  res.redirect("/users/profile");

})




module.exports = router;
