const User = require('../models/User.js');
const Manager = require('../models/Manager.js');
const randomString = require('randomstring');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');



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
          html:'<p> Hi '+name+', please click here to <a href="http://localhost:3000/forget-password?email='+email+'"> Reset </a> your password. </p>'
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
      console.log(userdata.name, userdata.email, randomstring);
      // res.render('forget', {message:"Please check your mail to reset your password."})
      res.status(200).send('Please check your mail to reset your password.');
      
      
    } catch (err) {
      console.log(err.message);
    }
  }
  

  
  exports.forgetpaswordload = async (req, res) => {
    try {
  
      const forgot_token = req.query.email;
      console.log("Recieved token:", forgot_token);
      const tokendata = await User.findOne({ email: forgot_token });
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
    await User.findByIdAndUpdate(_id,{$set:{password:passwordHash, forget_token:''}});

          
     res.redirect("/");
    
  } catch (err) {
    console.log(err.message);
    
  }
}



//Function for providing servicecenters


exports.getcarwashService= async (req, res) => {
  const servicecentre=req.body;
  const { location, address } = req.body;
  // let Managers = await Manager.find();
  let Managers = await Manager.find({
    'location': location,
    'address': address
  });
  Managers = Managers.filter(manager => manager.services.cleaning && manager.services.cleaning.price_carwash !== undefined && manager.services.cleaning.price_carwash !== null);
  req.session.servicecentre = servicecentre;
  
  req.session.managers = Managers;
  req.session.service = "wash";
  res.redirect("/users/got_centers");
}
exports.getcarparkService= async (req, res) => {
  const servicecentre=req.body;
  const { location, address } = req.body;
  // let Managers = await Manager.find();
  let Managers = await Manager.find({
    'location': location,
    'address': address
  });
  Managers = Managers.filter(manager => manager.services.parking && manager.services.parking.parking_price !== undefined && manager.services.parking.parking_price !== null);
  req.session.servicecentre = servicecentre;
  req.session.managers = Managers;
  req.session.service = "park";
  res.redirect("/users/got_centers");
}
exports.getcarchargeService= async (req, res) => {
  const servicecentre=req.body;
  const { location, address } = req.body;
  // let Managers = await Manager.find();
  let Managers = await Manager.find({
    'location': location,
    'address': address
  });
  Managers = Managers.filter(manager => manager.services.charging && manager.services.charging.charging_price !== undefined && manager.services.charging.charging_price !== null);
  req.session.servicecentre = servicecentre;
  req.session.managers = Managers;
  req.session.service = "charge";
  res.redirect("/users/got_centers");
}
exports.getcarinspectionService= async (req, res) => {
  const servicecentre=req.body;
  const { location, address } = req.body;
  // let Managers = await Manager.find();
console.log(req.body);
  let Managers = await Manager.find({
    'location': location,
    'address': address
  });
  Managers = Managers.filter(manager => manager.services.inspection && manager.services.inspection.inspection_price !== undefined && manager.services.inspection.inspection_price !== null);
  req.session.servicecentre = servicecentre;
  req.session.managers = Managers;
  req.session.service = "inspection";

  res.redirect("/users/got_centers");
}
exports.getcarpaintingService= async (req, res) => {
  const servicecentre=req.body;
  const { location, address } = req.body;
  // let Managers = await Manager.find();

  let Managers = await Manager.find({
    'location': location,
    'address': address
  });
  Managers = Managers.filter(manager => manager.services.painting && manager.services.painting.painting_price !== undefined && manager.services.painting.painting_price !== null);
  req.session.servicecentre = servicecentre;
  req.session.managers = Managers;
  req.session.service = "painting";

  res.redirect("/users/got_centers");
}


exports.addmoney=async (req, res) => {
  const user= req.user;
  const amount = parseFloat(req.body.amount); 


  if (isNaN(amount)) {
      return res.status(400).json({ error: 'Invalid amount' });
  }

user.wallet += amount;
  await user.save();
res.redirect('/users/user_wallet/');
}

exports.book_park=async (req, res) => {

}

