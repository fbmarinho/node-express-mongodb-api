const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')


module.exports = function(app){

  //LOGIN
  app.post('/auth/login/', async (req,res)=>{
    const {email, password} = req.body;

    if(!email) return res.status(400).json({message: 'Email is required !'});
    if(!password) return res.status(400).json({message: 'Password is required !'});

    try {
      const user = await User.findOne({email});
      if(!user)return res.status(404).json({message: 'User not found !'});

      const checkPassword = await bcrypt.compare(password, user.password);

      if(!checkPassword){
        return res.status(401).json({message: 'Invalid password'});
      }

      const secret = process.env.SECRET;

      const token = jwt.sign(
        { id: user._id },
        secret
      )

      res.status(200).json({message: "Authenticated", token})
    } catch (error) {
      res.status(500).json({error: error})
    }
  });

  //REGISTER
  app.post('/auth/register', async (req,res)=>{

    const {email, password, confirmPassword } = req.body;

    if(!email) return res.status(400).json({message: 'Email is required !'});
    if(!password) return res.status(400).json({message: 'Password is required !'});
    if(!confirmPassword) return res.status(400).json({message: 'Password confirmation is required !'});
    if(password !== confirmPassword) return res.status(400).json({message: 'Password confirmation is required !'});
    
    try {
      const user = await User.findOne({email});
      if(user) return res.status(400).json({message: 'User already exists'});

      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      await User.create({email,password: passwordHash});

      res.status(200).json({message: 'User registered successfully !'})
    } catch (error) {
      res.status(500).json({error: error})
    }

  });

}