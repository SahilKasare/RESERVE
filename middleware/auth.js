const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
exports.verifyToken=async(req,res,next)=>{
    try{
        let token=req.cookies("authorization");
        
        if(!token){
            res.status(403).json("Access Denied");
        }

      if(token.startsWith("Bearer ")){
            token.slice(7,token.length).trim
        }
        const verified=jwt(token,process.env.JWT_SECRET);
        req.user=verified;
        next();
    }catch(error){
      res.status(500).json({error:error.message});
    }
}