
    const User = require('../models/User');
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcrypt');
    var bodyParser = require('body-parser');

    const secretkey = 'secretkey';

    // To register a new User

    module.exports.signup = (req,res) => {
        try {
        
        const { name, email, password } = req.body;

        console.log(name);
     console.log(email);
     console.log(password);


        if(!name || !email || !password){
            res.status(400).json({msg: 'Please enter all fields'});
        }
    
        User.findOne({email})
        .then(user => {
            if(user) return res.status(400).json({msg: 'User already exists'});
    
            const newUser = new User({ name, email, password });
    
            // Create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user._id },
                                secretkey ,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user._id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            )
                        });
                })
            })
        })
    }catch(err){
        console.error(err.message);
        res.status(500).json({msg:'error'});
      }
    }
    

    //Login of User

    module.exports.login = async (req,res) => {
        try{
   
      const { email , password } = req.body;
 
        if(!email || !password){
            res.status(400).json({msg: 'Please enter all fields'});
        }
        User.findOne({email})
            .then(user => {
                if(!user) return res.status(400).json({msg: 'User does not exist'});
    
                // Validate password
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials'});
    
                        jwt.sign(
                            { id: user._id },
                            secretkey,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user._id,
                                        name: user.name,
                                        email: user.email
                                    }
                                });
                            }
                        )
                    })
            })
        }catch(err){
            console.error(err.message);
            res.status(500).json({msg:'error'});
          }
    }
    
  // Login User Information

    module.exports.get_User = async (req,res)=>{

        try{
          const user = await User.findById(req.user.id).select('-password');
          res.json(user);
        }catch(err){
          console.error(err.message);
          res.status(500).json({msg:'error'});
        }
      
      }