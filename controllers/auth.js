const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const Manager = require('../models/Manager.js');
const Admin = require('../models/Admin.js');

const bcrypt = require('bcrypt');
//USER AUTH 

//USER SIGNUP








exports.registerUser = async (req, res) => {
  try {
   
    const {
      username,
      email,
      password,
      name,
      license,
      vehicle,
      contact,
      address,
      brand,
      model,
      description
    } = req.body;

    const car_description = `${description} ${brand} ${model}`;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: passwordHash,
      name,
      license,
      vehicle,
      contact,
      email,
      address,
      car_description,
    });

    const savedUser = await newUser.save();
    res.redirect('/userLogin');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





//USER LOGIN
exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;



    const user = await User.findOne({ username: username });

    

    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    delete user.password;

    res.cookie('authorization', token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.redirect('/users/profile');

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: error.message });
  }
};


//USER LOGOUT 
exports.userLogout = async (req, res) => {
  try {
   
    res.clearCookie('authorization');

    
    res.redirect('/');
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).json({ error: error.message });
  }
};
  //MANAGER AUTH

  //MANAGER SIGNUP

  exports.registerManager = async (req, res) => {
    try {
      const {
        username,
        password,
        name,
        companyName,
        location,
        address,
        contact,
        email,
        parking_slots,
        parking_price,
        price_carwash,
        price_full,
        charging_price,
        charging_slots,
        inspection_price,
        painting_price,
        denting,
        service_pic
      } = req.body;
  

      let services = {};
  

      if (parking_slots && parking_price) {
        services.parking = {
          parking_slots: parseInt(parking_slots),
          parking_price: parseFloat(parking_price)
        };
      }
  

      if (price_carwash && price_full) {
        services.cleaning = {
          price_carwash: parseFloat(price_carwash),
          price_full: parseFloat(price_full)
        };
      }
  

      if (charging_price && charging_slots) {
        services.charging = {
          charging_price: parseFloat(charging_price),
          charging_slots: parseInt(charging_slots)
        };
      }
  

      if (inspection_price) {
        services.inspection = {
          inspection_price: parseFloat(inspection_price)
        };
      }
  
      if (painting_price && denting) {
        services.painting = {
          painting_price: parseFloat(painting_price),
          denting: denting === 'yes' ? true : false
        };
      }
  
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      const newManager = new Manager({
        username,
        password: passwordHash,
        name,
        companyName,
        location,
        address,
        contact,
        email,
        services,
        service_pic
      });
  
      const savedManager = await newManager.save();
      res.redirect('/managerLogin');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
    //MANAGER LOGIN

    
    exports.managerLogin=async(req,res)=>{
      try {
        const {username, password } = req.body;
    
    
    
        const manager = await Manager.findOne({ username: username });
    
        
    
        if (!manager) {
          return res.status(400).json({ msg: "User does not exist" });
        }
    
        const isMatch = await bcrypt.compare(password, manager.password);
    
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid Credentials" });
        }
    
        const token = jwt.sign({ id: manager._id }, process.env.JWT_SECRET);
    
        delete manager.password;
    
        res.cookie('authorization', token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
    
        res.redirect('/managers/dashboard');
    
      } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: error.message });
      }
      
      }

      //MANAGER LOGOUT 
      exports.managerLogout = async (req, res) => {
        try {
         
          res.clearCookie('authorization');
      
          
          res.redirect('/');
        } catch (error) {
          console.error('Logout Error:', error);
          res.status(500).json({ error: error.message });
        }
      };

      //ADMIN AUTH

      //ADMIN LOGIN
      exports.adminLogin=async(req,res)=>{
        try {
          const { username, password } = req.body;
      
      
      
          const admin = await Admin.findOne({ username:username});
      
          
      
          if (!admin) {
            return res.status(400).json({ msg: "User does not exist" });
          }
      
          const isMatch = await bcrypt.compare(password, admin.password);
      
          if (!isMatch) {
            return res.status(400).json({ msg: "Invalid Credentials" });
          }
      
          const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
      
          delete admin.password;
      
          res.cookie('authorization', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          });
      
          res.redirect('/admin/dashboard');
      
        } catch (error) {
          console.error('Login Error:', error);
          res.status(500).json({ error: error.message });
        }
      
      }

      //ADMIN LOGOUT 
      exports.adminLogout = async (req, res) => {
        try {
         
          res.clearCookie('authorization');
      
          
          res.redirect('/');
        } catch (error) {
          console.error('Logout Error:', error);
          res.status(500).json({ error: error.message });
        }
      };