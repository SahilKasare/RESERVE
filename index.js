const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const app=express();
const UserRoutes=require('./routes/User')
const ManagerRoutes=require('./routes/Manager')
const AdminRoutes=require('./routes/Admin');
const { verifyToken } = require('./middleware/auth');
const {userLogin}=require('./controllers/auth')
const {registerUser}=require('./controllers/auth')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/css', express.static(path.join(__dirname, 'views', 'CSS')));
app.use('/Fonts', express.static(path.join(__dirname, 'views', 'Fonts')));
app.use('/Images', express.static(path.join(__dirname, 'views', 'Images')));
app.use('/JS', express.static(path.join(__dirname, 'views', 'JS')));
dotenv.config();
const port= process.env.PORT ||3001;
mongoose.connect(process.env.MONGOURL).then(()=>{
    app.listen(port,()=>console.log(`Server Port:${port}`));

}).catch((error)=>console.log(`${error} did not connect`));

app.use('/users',UserRoutes);
app.use('/managers',ManagerRoutes);
app.use('/admin',AdminRoutes);

//Setting base route 
app.get('/', (req, res) => {
   
    res.render('index');
});

app.get('/userLogin', (req, res) => {
   
    res.render('login_user');
});

app.post('/userLogin',userLogin);
app.post('/registerUser',registerUser);
app.get('/userDetails',(req,res)=>{
    res.render('form_user');

})