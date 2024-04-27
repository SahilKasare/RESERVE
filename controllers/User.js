const User = require('../models/User.js');
const randomString = require('randomstring');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');

exports.getUser=async(req,res)=>{
    try{
     const {id}=req.params;
     const user=await User.findById(id);
     res.status(200).json(user)
    }catch(error){
        res.status(404),json({message:error.message});
    }
}


//For Mail send

exports.forgetpassword = async (req, res) => {
 
  res.clearCookie('forget_token').render('../views/forget');
 
}


const sendresetpasswordmail = async (name, email, forget_token) => {
    try {
      
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        requireTLS: true,
        auth: {
          user: process.env.RESERVE_MAIL,
          pass: process.env.RESERVE_PASS,
        },
      });
  
      const mailoptions = {
          from: 'reserve.carservice10@gmail.com',
          to: email,
          subject: 'For Reset Password', 
          html:'<p> Hi '+name+', please click here to <a href="http://localhost:3000/forget-password?token='+forget_token+'"> Reset </a> your password. </p>'
      }
  
      transporter.sendMail(mailoptions, function(err, info){
        if(err){
          console.log(err);
        }
        else{
          console.log("Email has been sent:-",info.response);
        }
      })
  
      
    } catch (err) {
      console.log(err.message);
    }
  }
  
  
  exports.forgetverify = async (req, res) => {
    try {
      const {email} = req.body;
      const userdata = await User.findOne({ email });
      if(!userdata)  return res.status(401).send("user with this email not found");
      
      const randomstring = randomString.generate();
      
      console.log(randomstring);
      const updatedata = await User.updateOne({email},{$set:{forget_token:randomstring}});
      sendresetpasswordmail(userdata.name, userdata.email, randomstring);
      // res.render('forget', {message:"Please check your mail to reset your password."})
      res.status(200).send('Please check your mail to reset your password.');
      
      
    } catch (err) {
      console.log(err.message);
    }
  }
  
  // exports.forgotLoad =async(req,res)=>{
  //   try{
  //       res.render('forgot');
  //   }catch(error){
  //       res.status(404),json({message:error.message});
  //   }
  // }
  
  exports.forgetpaswordload = async (req, res) => {
    try {
  
      const forget_token = req.query.forget_token;
      const tokendata = await User.findOne({forget_token});
      console.log(forget_token);
      if(!tokendata)  return res.status(401).send("token is invalid");
     
      res.render('forget-password',{user_id:tokendata._id});
  
      
    } catch (err) {
      console.log(err.message);
    }
  }
  
  
  
  

exports.resetpassword = async (req, res) => {
  try {
    const { password , _id} = req.body;
    

    const user = await User.findOne({ _id });


    // Hash the new password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Update the password in the database
    await User.findByIdAndUpdate(user._id,{$set:{password:passwordHash, forget_token:''}});

          
     res.redirect("/");
    
  } catch (err) {
    console.log(err.message);
    
  }
}