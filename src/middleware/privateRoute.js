const jwt = require('jsonwebtoken');

const privateRoute = async (req, res, next) => {
  const {id} = req.params;
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];
  if(!token)return res.status(401).json({msg: 'Access denied'});

  try {
    const secret = process.env.SECRET;
    
    const payload = await jwt.verify(token, secret);
    console.log(payload);
    if(payload.id !== id) return res.status(401).json({message: "Invalid Token for this user"})

    next();
    
  } catch (error) {
    res.status(400).json({message: "Invalid Token"})
  }
};


module.exports = privateRoute;