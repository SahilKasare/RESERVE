const express=require('express');
const router=express.Router();
const {verifyToken}=require('../middleware/auth.js');
const User =require('../models/User.js')
const jwt=require('jsonwebtoken')
const path = require('path');
const upload = require("./multer.js");
const { decode } = require('punycode');
const Admin=require('../models/Admin')


router.get("/dashboard",verifyToken,async(req, res) => {
    const token = req.cookies.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const admin = await Admin.findById(decoded.id).select('-password');
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
      res.render('admin_dashboard', {admin});
    });
  

module.exports = router;