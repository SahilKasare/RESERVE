const Manager = require('../models/Manager.js');
const jwt=require('jsonwebtoken')


exports.getmanagers=async(req,res, next)=>{
    const token = req.cookies.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const manager = await Manager.findById(decoded.id).select('-password');
      if (!manager) {
        return res.status(404).json({ error: "Manager not found" });
      }
      req.manager=manager;
        next();
}

