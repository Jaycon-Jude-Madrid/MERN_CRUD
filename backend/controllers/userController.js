const jwt = require("jsonwebtoken");
const User = require('../models/userModel');


//Create a jwt token
const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn: '3d'})
    }

//Login User

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.login(email,password)

        //create a token 
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch(error) {
        res.status(500).json({error: error.message})
    }


}




 

//Signup User
const signUser = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.signup(email,password)

        //create a token 
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch(error) {
        res.status(500).json({error: error.message})
    }

  
}


module.exports = {
    loginUser,
    signUser
}