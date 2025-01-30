const jwt = require('jsonwebtoken');
require("dotenv").config();


function setauth(user){
  return jwt.sign(user,process.env.JWT_SECRET_KEY)
}

function auth(req,res,next){
  const token = req.header('Authorization').replace('Bearer ','')
  console.log(token)
    if(!token) return res.status(401).send({error:"Access Denied"})
  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user = decoded
    next()
  }catch(error){
    return res.status(401).json({error:"Token expired or invalid"})
  }    
}
module.exports = {setauth,auth}