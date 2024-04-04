import mongoose from 'mongoose'
import dotenv from 'dotenv'
import express from 'express'

const app=express();

dotenv.config();
const port= process.env.PORT ||3001;
mongoose.connect(process.env.MONGOURL).then(()=>{
    app.listen(port,()=>console.log(`Server Port:${port}`));

}).catch((error)=>console.log(`${error} did not connect`));

