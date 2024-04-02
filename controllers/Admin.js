import Admin from "../models/Admin.js"

export const getAdmin=async(req,res)=>{
    try{
     const {id}=req.params;
     const user=await Admin.findById(id);
     res.status(200).json(user)
    }catch(error){
        res.status(404),json({message:error.message});
    }
}