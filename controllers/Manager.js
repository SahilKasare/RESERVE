const Manager = require('../models/Manager.js');

export const getManager=async(req,res)=>{
    try{
     const {id}=req.params;
     const user=await Manager.findById(id);
     res.status(200).json(user)
    }catch(error){
        res.status(404),json({message:error.message});
    }
}