const Manager = require('../models/Manager.js');

exports.getManager=async(req,res)=>{
    try{
     const {id}=req.params;
     const user=await Manager.findById(id);
     res.status(200).json(user)
    }catch(error){
        res.status(404),json({message:error.message});
    }
}

exports.getUniqueLocations = async (req, res) => {
    try {
        const locations = await Manager.distinct('location');
        res.status(200).json(locations);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.updateinfo = async (req, res) => {
    try {
        const manager = req.manager; 
              
              
              
                if (req.body.name !== undefined) {
                    manager.name = req.body.name;
                }
                if (req.body.email !== undefined) {
                    manager.email = req.body.email;
                }
                if (req.body.contact !== undefined) {
                    manager.contact = req.body.contact;
                }
                if (req.body.companyName !== undefined) {
                    manager.companyName = req.body.companyName;
                }
                if (req.body.address !== undefined) {
                    manager.address = req.body.address;
                }
                if (req.body.location !== undefined) {
                    manager.location = req.body.location;
                }
                if(req.body.price_wash !== undefined){
                    manager.services.cleaning.price_wash=req.body.price_wash;
                }
                if(req.body.parking_price !== undefined){
                    manager.services.parking.parking_price=req.body.parking_price;
                }
                if(req.body.parking_slots !== undefined){
                    manager.services.parking.parking_slots=req.body.parking_slots;
                }
                if(req.body.charging_price !== undefined){
                    manager.services.charging.charging_price=req.body.charging_price;
                }
                if(req.body.charging_slots !== undefined){
                    manager.services.charging.charging_slots=req.body.charging_slots;
                }
                if(req.body.inspection_price !== undefined){
                    manager.services.inspection.inspection_price=req.body.inspection_price;
                }
                if(req.body.painting_price !== undefined){
                    manager.services.painting.painting_price=req.body.painting_price;
                }
  manager.save();
  
       res.redirect('/managers/update')
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}

exports.addmoney=async (req, res) => {
    try {
        const manager=req.manager;
const amount=req.body.amount;
manager.wallet+=amount;
manager.save();
res.redirect('/managers/wallet')
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
