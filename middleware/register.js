const getDetails=async(req,res,next)=>{

        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
          return res.status(400).json({ message: 'Username, email, and password are required' });
        }
        req.username = username;
  req.email = email;
  req.password = password;

        next();
     
}