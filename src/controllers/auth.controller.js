require("dotenv").config();
const User = require("../models/Users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const newToken = (user) => {
    return jwt.sign({user}, process.env.JWT_SECRET_KEY);
}

const login = async (req, res)=>{
    try {
        if(!req.body.email || !req.body.password){
            return res.status(400).json({msg: "Please enter both email or password"});
        }

        const user = await User.findOne({email: req.body.email}).lean().exec();

        if(!user){
            return res.status(400).json({msg: "User not found"});
        }

        // const match = await user.comparePassword(req.body.password);
        // console.log(user.comparePassword(req.body.password));
        const match = bcrypt.compareSync(req.body.password, user.password);

        if(!match){
            return res.status(400).json({msg: "Your Mail or Password is incorrect"});
        }

        const token = newToken(user);

        return res.status(200).json({msg: "Login Successful", nickName:user.nickName, profileImage: user.profileImage, token});
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

const register = async (req, res)=>{
    try {
        
        const user = await User.findOne({email: req.body.email}).lean().exec();

        if(user){
            return res.status(400).send({msg: "User already exists"});
        }

        const newUser = await User.create(req.body);

        const token = newToken(newUser);

        return res
          .status(201)
          .json({
            msg: "User created successfully",
            nickName: newUser.nickName,
            profileImage: newUser.profileImage,
            token,
          });
    }catch(err){
        return res.status(500).send(err.message);
    }
}

module.exports = {login, register, newToken};