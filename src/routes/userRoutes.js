const User = require('../models/User');
const privateRoute = require('../middleware/privateRoute');

module.exports = function(app){
  
  //FIND BY ID
  app.get('/user/:id', privateRoute, async (req,res)=>{
    
    try {
      const user = await User.findById(req.params.id);

      if(!user) return res.status(404).json({message: "User not found"});

      res.status(200).json({user})

    } catch (error) {
      res.status(500).json({error: error})
    }

  })
  //GET ALL
  app.get('/user', privateRoute, async (req,res)=>{
  
    try {
      const users = await User.find()
      res.status(200).json({users})
    } catch (error) {
      res.status(500).json({error: error})
    }
  
  })

  //UPDATE
  app.put('/user/', privateRoute, async (req,res)=>{

    try {
      const updatedUser = await User.findOneAndUpdate({email: req.body.email},req.body, {returnOriginal: false});
      res.status(200).json({message: 'User updated', updatedUser})
    } catch (error) {
      res.status(500).json({error: error})
    }
  
  })

  //UPDATE
  app.delete('/user/', privateRoute, async (req,res)=>{

    try {
      const user = await User.findOneAndDelete({email: req.body.email});
      res.status(200).json({message: 'User deleted'})
    } catch (error) {
      res.status(500).json({error: error})
    }
  
  })
}