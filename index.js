const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bodyparser=require('body-parser')
const app=express();
const UserRoutes=require('./routes/User')
const ManagerRoutes=require('./routes/Manager')
const AdminRoutes=require('./routes/Admin');
const { verifyToken } = require('./middleware/auth');
const {userLogin}=require('./controllers/auth')
const {adminLogin}=require('./controllers/auth')
const {managerLogin}=require('./controllers/auth')
const {registerUser}=require('./controllers/auth')
const {registerManager}=require('./controllers/auth')
const {feedbackSent}=require('./controllers/Feedback')
// const {forgotLoad}=require('./controllers/User')
// const {forgotVerify}=require('./controllers/User')
const {forgetpassword} = require('./controllers/User');
const {forgetverify} = require('./controllers/User');
const {forgetpaswordload} = require('./controllers/User');
const {resetpassword} = require('./controllers/User');
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/css', express.static(path.join(__dirname, 'views', 'CSS')));
app.use('/Fonts', express.static(path.join(__dirname, 'views', 'Fonts')));
app.use('/Images', express.static(path.join(__dirname, 'views', 'Images')));
app.use('/JS', express.static(path.join(__dirname, 'views', 'JS')));
dotenv.config();

app.use(cookieParser());
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

// Landing page routes

app.get('/access-account', (req, res) => {
    res.render('junction');
})

app.get('/FAQs', (req, res) => {
    res.render('faq');
})

app.get('/feedback', (req, res) => {
    res.render('feedback');
})
app.get('/aboutUs', (req, res) => {
    res.render('aboutus');
})

app.post('/feedback', feedbackSent);


//Forget Password
// app.get('/forgotPassword', forgotLoad);
// app.post('/forgotPassword', forgotVerify);


// forgot password for user
app.get('/forget', forgetpassword);
app.post('/forget',forgetverify);

app.get('/forget-password',forgetpaswordload);
app.post('/forget-password',resetpassword);


app.get('/userLogin', (req, res) => {
   
    res.render('login_user');
});

app.post('/userLogin',userLogin);
app.post('/userDetails',registerUser);
app.get('/userDetails',(req,res)=>{
    res.render('form_user');

})

app.get('/managerLogin',(req,res)=>{
    res.render('login_manager')
})

app.post('/managerLogin',managerLogin);

app.get('/managerDetails',(req,res)=>{
    res.render('form_manager')
})

app.post('/managerDetails',registerManager);

app.get('/adminLogin',(req,res)=>{
    res.render('login_admin');
})
app.post('/adminLogin',adminLogin);






app.get('/removeSession', function(req, res){
    req.session.destroy(function(err){
      if (err) throw err;
      res.send("Session Destroyed");
    });
  })

// Guest routes


//guest pages
app.get('/service1', (req, res)=>{
    res.render('guest1park');
})

app.get('/service2', (req, res)=>{
    res.render('guest2wash');
})

app.get('/service3', (req, res)=>{
    res.render('guest3EV');
})

app.get('/service4', (req, res)=>{
    res.render('guest4interior');
})

app.get('/service5', (req, res)=>{
    res.render('guest5paint');
})
