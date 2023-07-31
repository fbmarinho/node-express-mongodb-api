const User = require('../models/User')

module.exports = function(app){
  //CREATE
  app.post('/user', async (req,res)=>{
    
    try {
      const users = await User.find({email: req.body.email});
      if(users.length > 0){
        res.status(201).json({message: 'User already exists'});
        return
      }
      const newUser = await User.create(req.body);
      res.status(200).json({message: 'User created', newUser})
    } catch (error) {
      res.status(500).json({error: error})
    }
  
  });

  //READ
  app.get('/user', async (req,res)=>{
  
    try {
      const users = await User.find()
      res.status(200).json({users})
    } catch (error) {
      res.status(500).json({error: error})
    }
  
  })

  //UPDATE
  app.patch('/user/', async (req,res)=>{

    try {
      const updatedUser = await User.findOneAndUpdate({email: req.body.email},req.body, {returnOriginal: false});
      res.status(200).json({message: 'User updated', updatedUser})
    } catch (error) {
      res.status(500).json({error: error})
    }
  
  })

  //UPDATE
  app.delete('/user/', async (req,res)=>{

    try {
      const user = await User.findOneAndDelete({email: req.body.email});
      res.status(200).json({message: 'User deleted'})
    } catch (error) {
      res.status(500).json({error: error})
    }
  
  })
}