const jwt = require("jsonwebtoken")

function auth(req,res,next){

const token = req.headers.authorization

if(!token){
return res.send("Access denied")
}

try{

const verified = jwt.verify(token,process.env.JWT_SECRET)
req.doctor = verified

next()

}catch(err){

res.send("Invalid token")

}

}

module.exports = auth