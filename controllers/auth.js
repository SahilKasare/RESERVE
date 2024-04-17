const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const Manager = require('../models/Manager.js');
const Admin = require('../models/Admin.js');


//USER AUTH 

//USER SIGNUP
exports.registerUser=async(req,res)=>{

try{
    
    const {username,
    password,
    name,
    license,
    vehicle,
    contact,
    email,
    address,
    car_description,
}=req.body;

const salt=await bcrypt.genSalt();
const passwordHash=await bcrypt.hash(password,salt);

const newUser=new User({
    username,
    password:passwordHash,
    name,
    license,
    vehicle,
    contact,
    email,
    address,
    car_description,

})

const savedUser=await newUser.save();
res.status(201).json(savedUser);
  }catch(error){
   res.status(500).json({error:error.message});
  }  

}

//USER LOGIN
exports.userLogin=async(req,res)=>{
    try{
      const {email,password}=req.body;
      const user=await User.findOne({email:email});
      if(!user)
      return res.status(400).json({msg:"User does not exist"});
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch)
    return res.status(400).json({msg:"Invalid Credentials"});
  const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
  delete user.password;
  res.cookie('authorization', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, 
  });

 
   res.redirect('/users/profile');

 
    }catch(error){
     res.status(500).json({error:error.message});
    }  
  
  }

  //MANAGER AUTH

  //MANAGER SIGNUP

  exports.registerManager=async(req,res)=>{

    try{
        
        const {username,
            password,
            name,
            companyName,
            location,
            address,
            contact,
            email,
            services,
    }=req.body;
    
    const salt=await bcrypt.genSalt();
    const passwordHash=await bcrypt.hash(password,salt);
    
    const newManager=new Manager({
        username,
        password:passwordHash,
        name,
        companyName,
        location,
        address,
        contact,
        email,
        services,
    
    })
    
    const savedManager=await newManager.save();
    res.status(201).json(savedManager);
      }catch(error){
       res.status(500).json({error:error.message});
      }  
    
    }

    //MANAGER LOGIN

    
    exports.ManagerLogin=async(req,res)=>{
        try{
          const {email,password}=req.body;
          const user=await Manager.findOne({email:email});
          if(!user)
          return res.status(400).json({msg:"User does not exist"});
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
        return res.status(400).json({msg:"Invalid Credentials"});
      const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({token,user});
        }catch(error){
         res.status(500).json({error:error.message});
        }  
      
      }

      //ADMIN AUTH

      //ADMIN LOGIN
      exports.AdminLogin=async(req,res)=>{
        try{
          const {email,password}=req.body;
          const user=await Admin.findOne({email:email});
          if(!user)
          return res.status(400).json({msg:"User does not exist"});
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
        return res.status(400).json({msg:"Invalid Credentials"});
      const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({token,user});
        }catch(error){
         res.status(500).json({error:error.message});
        }  
      
      }