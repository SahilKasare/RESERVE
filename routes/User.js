const express=require('express');
const router=express.Router();
const {verifyToken}=require('../middleware/auth.js');


router.get("/profile",verifyToken,(req, res) => {
    const user = req.user;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.render('user_service', { user});
  });
module.exports = router;