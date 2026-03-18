const User = require("../models/User")

exports.getUsers = async (req,res)=>{

try{

const users = await User.find().select("-password")

res.json(users)

}catch(error){

res.status(500).json({error:error.message})

}

}


exports.getUser = async (req,res)=>{

try{

const user = await User.findById(req.params.id).select("-password")

res.json(user)

}catch(error){

res.status(500).json({error:error.message})

}

}