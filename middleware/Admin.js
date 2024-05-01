const Admin = require('../models/Admin.js');
const jwt=require('jsonwebtoken')


exports.getadmins=async(req,res, next)=>{
    const token = req.cookies.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const admin = await Admin.findById(decoded.id).select('-password');
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
req.admin=admin;
next();
}