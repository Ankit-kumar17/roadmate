const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/register",async (req,res) => {
    try{
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message:"User Already exists",
            });
        }

        const hashedPasssword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,email,password:hashedPasssword,
        });

        res.status(201).json({
            message: "User registered successfully",
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            },
        });
    }
    catch(error) {
        res.status(500).json({
            message:"Server error",
        })
    }
});

router.post("/login", async(req,res) =>{
    try{
        const{email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                message:"invalid email or password ",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if(!isPasswordCorrect){
            return res.status(400).json({
                message:"Invalid email or passwword",
            })
        };

        res.status(200).json({
            message:"login successful",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },
        });
    }
    catch(error){
        res.status(500).json({
            message:"server error",
        })
        
    }
})
module.exports = router;